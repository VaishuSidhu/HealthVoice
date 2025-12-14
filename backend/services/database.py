"""
Database Service
Handles all MongoDB operations for health logs and user data
"""

from pymongo import MongoClient
from pymongo.errors import ConnectionFailure, OperationFailure
from datetime import datetime, timedelta
from typing import Dict, List, Optional
import os


class DatabaseService:
    """Service for managing MongoDB database connections and operations"""
    
    def __init__(self):
        """Initialize database connection using environment variables"""
        # Get MongoDB connection string from environment
        connection_string = os.getenv(
            'MONGODB_URI',
            'mongodb://localhost:27017/healthvoice'
        )
        
        # Extract database name from connection string
        # Format: mongodb://host:port/dbname or mongodb+srv://host/dbname
        db_name = 'healthvoice'  # Default database name
        if '/' in connection_string:
            # Extract database name from connection string
            parts = connection_string.split('/')
            if len(parts) > 3:
                # Has database name in connection string
                db_part = parts[-1].split('?')[0]  # Remove query parameters
                if db_part:
                    db_name = db_part
        
        try:
            # Connect to MongoDB
            self.client = MongoClient(connection_string)
            self.db = self.client[db_name]
            
            # Test connection
            self.client.admin.command('ping')
            print(f"✓ Successfully connected to MongoDB (database: {db_name})")
            
            # Initialize collections
            self.health_logs = self.db.health_logs
            self.users = self.db.users
            
            # Create indexes for better query performance
            self._create_indexes()
            
        except ConnectionFailure as e:
            print(f"✗ Failed to connect to MongoDB: {e}")
            print("Note: If using local MongoDB, ensure it's running.")
            print("For MongoDB Atlas, check your connection string and network access.")
            raise
    
    def _create_indexes(self):
        """Create database indexes for optimized queries"""
        try:
            # Index on timestamp for date range queries
            self.health_logs.create_index([("timestamp", -1)])
            # Index on user_id for user-specific queries
            self.health_logs.create_index([("user_id", 1)])
            # Compound index for user-specific date queries
            self.health_logs.create_index([("user_id", 1), ("timestamp", -1)])
            print("✓ Database indexes created")
        except Exception as e:
            print(f"Warning: Could not create indexes: {e}")
    
    def insert_health_log(self, log_data: Dict, user_id: str = None) -> str:
        """
        Insert a new health log into the database
        
        Args:
            log_data: Dictionary containing health log information
            user_id: User ID to associate with the log
            
        Returns:
            str: The inserted document ID
        """
        try:
            # Add timestamp if not present
            if 'timestamp' not in log_data:
                log_data['timestamp'] = datetime.utcnow()
            
            # Add user_id if provided
            if user_id:
                log_data['user_id'] = user_id
            
            # Insert document
            result = self.health_logs.insert_one(log_data)
            return str(result.inserted_id)
            
        except OperationFailure as e:
            print(f"Error inserting health log: {e}")
            raise
    
    def get_recent_logs(self, days: int = 7, limit: int = 100, user_id: str = None) -> List[Dict]:
        """
        Get recent health logs within specified days
        
        Args:
            days: Number of days to look back
            limit: Maximum number of logs to return
            user_id: User ID to filter logs (if provided)
            
        Returns:
            List of health log documents
        """
        try:
            # Calculate date threshold
            date_threshold = datetime.utcnow() - timedelta(days=days)
            
            # Build query filter
            query = {"timestamp": {"$gte": date_threshold}}
            if user_id:
                query["user_id"] = user_id
            
            # Query recent logs, sorted by timestamp (newest first)
            logs = self.health_logs.find(query).sort("timestamp", -1).limit(limit)
            
            # Convert ObjectId to string for JSON serialization
            result = []
            for log in logs:
                log['_id'] = str(log['_id'])
                result.append(log)
            
            return result
            
        except Exception as e:
            print(f"Error fetching recent logs: {e}")
            raise
    
    def get_today_logs(self, user_id: str = None) -> List[Dict]:
        """Get all health logs from today"""
        try:
            today_start = datetime.utcnow().replace(hour=0, minute=0, second=0, microsecond=0)
            
            # Build query filter
            query = {"timestamp": {"$gte": today_start}}
            if user_id:
                query["user_id"] = user_id
            
            logs = self.health_logs.find(query).sort("timestamp", -1)
            
            result = []
            for log in logs:
                log['_id'] = str(log['_id'])
                result.append(log)
            
            return result
            
        except Exception as e:
            print(f"Error fetching today's logs: {e}")
            raise
    
    def get_all_logs(self, limit: int = 1000, user_id: str = None) -> List[Dict]:
        """
        Get all health logs (for comprehensive analysis)
        
        Args:
            limit: Maximum number of logs to return
            user_id: User ID to filter logs (if provided)
            
        Returns:
            List of health log documents
        """
        try:
            # Build query filter
            query = {}
            if user_id:
                query["user_id"] = user_id
            
            logs = self.health_logs.find(query).sort("timestamp", -1).limit(limit)
            
            result = []
            for log in logs:
                log['_id'] = str(log['_id'])
                result.append(log)
            
            return result
            
        except Exception as e:
            print(f"Error fetching all logs: {e}")
            raise
    
    def close(self):
        """Close database connection"""
        if self.client:
            self.client.close()
            print("Database connection closed")

