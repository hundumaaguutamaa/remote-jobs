import requests
from .models import Job
from bs4 import BeautifulSoup
from datetime import datetime
import logging

logger = logging.getLogger(__name__)

def save_job_if_not_exists(title, company, description, location, url, source, posted_at):
    # Check if job already exists based on title, company, and URL
    if not Job.objects.filter(title=title, company=company, url=url).exists():
        Job.objects.create(
            title=title,
            company=company,
            description=description,
            location=location,
            url=url,
            source=source,
            posted_at=posted_at
        )
        logger.info(f"Saved job: {title} at {company}")

def fetch_github_jobs():
    url = 'https://jobs.github.com/positions.json?description=remote'
    try:
        response = requests.get(url)
        response.raise_for_status()
        jobs = response.json()
        for job_data in jobs:
            save_job_if_not_exists(
                title=job_data['title'],
                company=job_data['company'],
                description=job_data['description'],
                location=job_data['location'],
                url=job_data['url'],
                source='GitHub',
                posted_at=datetime.strptime(job_data['created_at'], '%a %b %d %H:%M:%S %Z %Y')
            )
    except requests.exceptions.RequestException as e:
        logger.error(f"Error fetching GitHub jobs: {e}")

def fetch_remote_ok_jobs():
    url = 'https://remoteok.io/api'
    headers = {'User-Agent': 'Mozilla/5.0'}
    try:
        response = requests.get(url, headers=headers)
        response.raise_for_status()
        jobs = response.json()
        for job_data in jobs:
            if 'id' in job_data:  # Ensure valid job data
                save_job_if_not_exists(
                    title=job_data['position'],
                    company=job_data['company'],
                    description=job_data.get('description', ''),
                    location=job_data.get('location', 'Remote'),
                    url=f"https://remoteok.io/l/{job_data['id']}",
                    source='Remote OK',
                    posted_at=datetime.fromtimestamp(job_data['date'])
                )
    except requests.exceptions.RequestException as e:
        logger.error(f"Error fetching Remote OK jobs: {e}")

def fetch_we_work_remotely_jobs():
    url = 'https://weworkremotely.com/remote-jobs.rss'
    try:
        response = requests.get(url)
        response.raise_for_status()
        soup = BeautifulSoup(response.content, 'xml')
        items = soup.find_all('item')
        for item in items:
            title = item.find('title').text
            company = item.find('author').text
            description = item.find('description').text
            link = item.find('link').text
            pub_date = item.find('pubDate').text
            save_job_if_not_exists(
                title=title,
                company=company,
                description=description,
                location="Remote",
                url=link,
                source='We Work Remotely',
                posted_at=datetime.strptime(pub_date, '%a, %d %b %Y %H:%M:%S %z')
            )
    except requests.exceptions.RequestException as e:
        logger.error(f"Error fetching We Work Remotely jobs: {e}")

def fetch_all_jobs():
    """Fetch jobs from all sources."""
    fetch_github_jobs()
    fetch_remote_ok_jobs()
    fetch_we_work_remotely_jobs()
