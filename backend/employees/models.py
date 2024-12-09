from django.db import models
from django.contrib.auth.models import User
from django.utils.translation import gettext as _


class Employee(models.Model):
    employee_id = models.CharField(max_length=200)
   
    employee_first_name = models.CharField(
        max_length=200, null=False, 
    )
    employee_last_name = models.CharField(
        max_length=200, null=True, blank=True, 
    )
    email = models.EmailField(max_length=254, unique=True)
    contact_number = models.CharField(
        max_length=15,
    )
    address = models.CharField(max_length=255, blank=True, null=True)
    country = models.CharField(max_length=30, blank=True, null=True)
    state = models.CharField(max_length=30, null=True, blank=True)
    city = models.CharField(max_length=30, null=True, blank=True)
    zip = models.CharField(max_length=20, null=True, blank=True)
    date_of_birth = models.DateField(null=True, blank=True)
    gender = models.CharField(
        max_length=10, 
    )
    qualification = models.CharField(max_length=50, blank=True, null=True)
    experience = models.IntegerField(null=True, blank=True)
    marital_status = models.CharField(
        max_length=50, 
    )
    emergency_contact = models.CharField(max_length=15, null=True, blank=True)
    emergency_contact_name = models.CharField(max_length=20, null=True, blank=True)
    emergency_contact_relation = models.CharField(max_length=20, null=True, blank=True)
    departmant = models.CharField(max_length=100,null=True)
    reporting_manager = models.CharField(max_length=100, null=True, blank=True)
    designation = models.CharField(max_length=100, null=True)
    date_of_joining = models.DateField(null=True,blank=True)
    employee_photo = models.ImageField(
        upload_to='employee_photos/', 
        null=True, 
        blank=True
    )

    def get_full_name(self):
        """
        Method will return employee full name
        """
        return (
            f"{self.employee_first_name } {self.employee_last_name}"
            if self.employee_last_name
            else self.employee_first_name
        )

    def __str__(self):
        return self.get_full_name()

