import random
from typing import Dict

def process_payment(amount: float, method: str) -> Dict:
    """Simulate payment processing with Stripe"""
    
    # Simulate payment processing
    success_rate = 0.95  # 95% success rate for simulation
    
    if random.random() < success_rate:
        return {
            "success": True,
            "transaction_id": f"txn_{random.randint(100000, 999999)}",
            "message": "Payment processed successfully"
        }
    else:
        return {
            "success": False,
            "error": "Payment failed - insufficient funds",
            "message": "Payment processing failed"
        }

def refund_payment(transaction_id: str, amount: float) -> Dict:
    """Simulate payment refund"""
    return {
        "success": True,
        "refund_id": f"ref_{random.randint(100000, 999999)}",
        "message": f"Refund of ${amount} processed successfully"
    }