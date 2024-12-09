from django.db import models
from django.contrib.auth.models import User

class Leave(models.Model):
    LEAVE_TYPE_CHOICES = [
        ('Sick Leave', 'Sick Leave'),
        ('Casual Leave', 'Casual Leave'),
        ('Annual Leave', 'Annual Leave'),
    ]
    
    TIME_PERIOD_CHOICES = [
        ('fullDay', 'Full Day'),
        ('firstHalf', 'First Half'),
        ('secondHalf', 'Second Half'),
    ]
    
    # Basic Fields
    leave_id = models.AutoField(primary_key=True)
    fromDate = models.DateField()
    toDate = models.DateField()
    leave_type = models.CharField(
        max_length=50,
        choices=LEAVE_TYPE_CHOICES,
        default='Sick Leave',
    )
    time_period = models.CharField(
        max_length=20,
        choices=TIME_PERIOD_CHOICES,
        default='fullDay',
    )
    notes = models.TextField(blank=True, null=True)
    notify = models.CharField(max_length=100, blank=True, null=True)  # Employee Name (or email)

    # Status of the leave (could be Pending, Approved, or Rejected)
    STATUS_CHOICES = [
        ('Pending', 'Pending'),
        ('Approved', 'Approved'),
        ('Rejected', 'Rejected'),
    ]
    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default='Pending',
    )
    
    user_id = models.IntegerField()

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.leave_type} from {self.fromDate} to {self.toDate}"

    def save(self, *args, **kwargs):
        # Remove microseconds from created_at and updated_at
        if self.created_at:
            self.created_at = self.created_at.replace(microsecond=0)
        if self.updated_at:
            self.updated_at = self.updated_at.replace(microsecond=0)
        super(Leave, self).save(*args, **kwargs)

    class Meta:
        verbose_name = "Leave Request"
        verbose_name_plural = "Leave Requests"
