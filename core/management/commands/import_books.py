import pandas as pd
from django.core.management.base import BaseCommand
from core.models import Book

class Command(BaseCommand):
    help = 'Import books from a CSV file into the Book model'

    def add_arguments(self, parser):
        parser.add_argument('file_path', type=str, help='The path to the CSV file')

    def handle(self, *args, **kwargs):
        file_path = kwargs['file_path']
        try:
            # Load the CSV file
            books_data = pd.read_csv(file_path)

            # Clean and prepare data
            books_data['Year-Of-Publication'] = pd.to_datetime(
                books_data['Year-Of-Publication'], errors='coerce', format='%Y'
            )
            books_data.rename(columns={
                'Book-Title': 'title',
                'Book-Author': 'author',
                'ISBN': 'isbn',
                'Image-URL-L': 'cover_image',
                'Year-Of-Publication': 'publication_year',
                'Publisher': 'publisher',
            }, inplace=True)

            # Import into the database
            for _, row in books_data.iterrows():
                # Handle NaT for publication_year
                publication_year = row['publication_year']
                if pd.isna(publication_year):
                    publication_year = None  # Replace NaT with None
                
                Book.objects.update_or_create(
                    isbn=row['isbn'],
                    defaults={
                        'title': row['title'],
                        'author': row['author'],
                        'cover_image': row['cover_image'],
                        'publication_year': publication_year,
                        'publisher': row['publisher'],
                    }
                )
            self.stdout.write(self.style.SUCCESS('Successfully imported books!'))
        except Exception as e:
            self.stdout.write(self.style.ERROR(f"Error importing books: {e}"))
