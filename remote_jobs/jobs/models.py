from django.db import models

class Job(models.Model):
    title = models.CharField(max_length=255)
    company = models.CharField(max_length=255)
    description = models.TextField()
    location = models.CharField(max_length=100)
    url = models.URLField(max_length=300)
    source = models.CharField(max_length=100)  # API source, e.g., 'GitHub', 'Remote OK'
    posted_at = models.DateTimeField()

    def __str__(self):
        return f"{self.title} at {self.company}"