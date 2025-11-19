// Theme Toggle Functionality
const themeToggle = document.getElementById('themeToggle');
const body = document.body;

// Check for saved theme preference or use default (light)
const savedTheme = localStorage.getItem('theme') || 'light';
if (savedTheme === 'dark') {
    body.setAttribute('data-theme', 'dark');
}

themeToggle.addEventListener('click', () => {
    if (body.getAttribute('data-theme') === 'dark') {
        body.removeAttribute('data-theme');
        localStorage.setItem('theme', 'light');
    } else {
        body.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
    }
});

// Navigation Functionality
const industryCanisters = document.querySelectorAll('.industry-canister');
const pageSections = document.querySelectorAll('.page-section');

industryCanisters.forEach(canister => {
    canister.addEventListener('click', () => {
        const industry = canister.getAttribute('data-industry');
        
        // Update active navigation item
        industryCanisters.forEach(c => c.classList.remove('active'));
        canister.classList.add('active');
        
        // Show corresponding section
        pageSections.forEach(section => {
            section.classList.remove('active');
            if (section.id === industry) {
                section.classList.add('active');
            }
        });
        
        // Scroll to top
        window.scrollTo(0, 0);
    });
});

// Footer link navigation
const footerLinks = document.querySelectorAll('.footer-links a[data-industry]');
footerLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const industry = link.getAttribute('data-industry');
        
        // Update active navigation item
        industryCanisters.forEach(c => c.classList.remove('active'));
        document.querySelector(`.industry-canister[data-industry="${industry}"]`).classList.add('active');
        
        // Show corresponding section
        pageSections.forEach(section => {
            section.classList.remove('active');
            if (section.id === industry) {
                section.classList.add('active');
            }
        });
        
        // Scroll to top
        window.scrollTo(0, 0);
    });
});

// Mood Selector Functionality
const moodOptions = document.querySelectorAll('.mood-option');

moodOptions.forEach(option => {
    option.addEventListener('click', () => {
        moodOptions.forEach(m => m.classList.remove('active'));
        option.classList.add('active');
        
        // In a real implementation, this would filter movies based on mood
        filterMoviesByMood(option.getAttribute('data-mood'));
    });
});

// Movie Data (In a real app, this would come from an API)
const moviesData = {
    featured: [
        {
            title: "Inception",
            year: 2010,
            rating: 4.8,
            description: "A thief who steals corporate secrets through dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
            poster: "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_.jpg",
            industry: "hollywood",
            moods: ["action", "thriller"]
        },
        {
            title: "Dilwale Dulhania Le Jayenge",
            year: 1995,
            rating: 4.7,
            description: "When Raj meets Simran in Europe, it isn't love at first sight but when Simran moves to India for an arranged marriage, love makes its presence felt.",
            poster: "https://m.media-amazon.com/images/M/MV5BMDQ2ZmE2NTMtZDE3NC00YzFjLWJhNmEtMDEzMTI5ZjU2ZGM0XkEyXkFqcGdeQXVyNTkzNDQ4ODc@._V1_.jpg",
            industry: "bollywood",
            moods: ["romance", "drama"]
        },
        {
            title: "Parasite",
            year: 2019,
            rating: 4.9,
            description: "Greed and class discrimination threaten the newly formed symbiotic relationship between the wealthy Park family and the destitute Kim clan.",
            poster: "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_.jpg",
            industry: "international",
            moods: ["drama", "thriller"]
        },
        {
            title: "The Shawshank Redemption",
            year: 1994,
            rating: 4.9,
            description: "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
            poster: "https://m.media-amazon.com/images/M/MV5BNDE3ODcxYzMtY2YzZC00NmNlLWJiNDMtZDViZWM2MzIxZDYwXkEyXkFqcGdeQXVyNjAwNDUxODI@._V1_.jpg",
            industry: "hollywood",
            moods: ["drama"]
        }
    ],
    hollywood: [
        {
            title: "The Dark Knight",
            year: 2008,
            rating: 4.9,
            description: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests.",
            poster: "https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_.jpg",
            industry: "hollywood",
            moods: ["action", "thriller"]
        },
        {
            title: "Pulp Fiction",
            year: 1994,
            rating: 4.8,
            description: "The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.",
            poster: "https://m.media-amazon.com/images/M/MV5BNGNhMDIzZTUtNTBlZi00MTRlLWFjM2ItYzJjNDymmYzgyZjkXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg",
            industry: "hollywood",
            moods: ["action", "drama"]
        },
        {
            title: "Forrest Gump",
            year: 1994,
            rating: 4.7,
            description: "The presidencies of Kennedy and Johnson, the Vietnam War, the Watergate scandal and other historical events unfold from the perspective of an Alabama man.",
            poster: "https://m.media-amazon.com/images/M/MV5BNWI1ODQ2MDAtNGVhMS00NjFmLWI1MDctOGVhNTJmMWE4M2ZmXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_.jpg",
            industry: "hollywood",
            moods: ["drama", "romance"]
        },
        {
            title: "The Matrix",
            year: 1999,
            rating: 4.7,
            description: "A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.",
            poster: "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_.jpg",
            industry: "hollywood",
            moods: ["action", "fantasy"]
        }
    ],
    bollywood: [
        {
            title: "3 Idiots",
            year: 2009,
            rating: 4.8,
            description: "Two friends are searching for their long lost companion. They revisit their college days and recall the memories of their friend who inspired them to think differently.",
            poster: "https://m.media-amazon.com/images/M/MV5BNTkyOGVjMGEtNmQzZi00NzFlLTlhOWQtODYyMDc2ZGJmYzFhXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_.jpg",
            industry: "bollywood",
            moods: ["comedy", "drama"]
        },
        {
            title: "Lagaan",
            year: 2001,
            rating: 4.6,
            description: "The people of a small village in Victorian India stake their future on a game of cricket against their ruthless British rulers.",
            poster: "https://m.media-amazon.com/images/M/MV5BNDYxNWUzZmYtOGQxMC00MTdkLTkxOTctYzkyOGIwNWQxZjhmXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_.jpg",
            industry: "bollywood",
            moods: ["drama"]
        },
        {
            title: "Zindagi Na Milegi Dobara",
            year: 2011,
            rating: 4.5,
            description: "Three friends decide to turn their fantasy vacation into reality after one of their friends gets engaged.",
            poster: "https://m.media-amazon.com/images/M/MV5BZGFmMjM5OWMtZTRiNC00ODhlLThlYTItYTcyMDMyYzI3YTM2XkEyXkFqcGdeQXVyNjY1MTg4Mzc@._V1_.jpg",
            industry: "bollywood",
            moods: ["drama", "comedy"]
        },
        {
            title: "Dangal",
            year: 2016,
            rating: 4.8,
            description: "Former wrestler Mahavir Singh Phogat trains his daughters Geeta and Babita to become India's first world-class female wrestlers.",
            poster: "https://m.media-amazon.com/images/M/MV5BMTQ4MzQzMzM2Nl5BMl5BanBnXkFtZTgwMTQ1NzU3MDI@._V1_.jpg",
            industry: "bollywood",
            moods: ["drama", "action"]
        }
    ],
    international: [
        {
            title: "Amélie",
            year: 2001,
            rating: 4.6,
            description: "Amélie is an innocent and naive girl in Paris with her own sense of justice. She decides to help those around her and along the way, discovers love.",
            poster: "https://m.media-amazon.com/images/M/MV5BNDg4NjM1YjMtYmNhZC00MjM0LWFiZmYtNGY1YjA3MzZmODc5XkEyXkFqcGdeQXVyNDk3NzU2MTQ@._V1_.jpg",
            industry: "international",
            moods: ["romance", "comedy"]
        },
        {
            title: "Spirited Away",
            year: 2001,
            rating: 4.8,
            description: "During her family's move to the suburbs, a sullen 10-year-old girl wanders into a world ruled by gods, witches, and spirits.",
            poster: "https://m.media-amazon.com/images/M/MV5BMjlmZmI5MDctNDE2YS00YWE0LWE5ZWItZDBhYWQ0NTcxNWRhXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_.jpg",
            industry: "international",
            moods: ["fantasy"]
        },
        {
            title: "The Lives of Others",
            year: 2006,
            rating: 4.7,
            description: "In 1984 East Berlin, an agent of the secret police, conducting surveillance on a writer and his lover, finds himself becoming increasingly absorbed by their lives.",
            poster: "https://m.media-amazon.com/images/M/MV5BOThkM2EzYmMtNDE3NS00NjlhLTg4YzktYTdhNzgyOWY3ZDYzXkEyXkFqcGdeQXVyNzQzNzQxNzI@._V1_.jpg",
            industry: "international",
            moods: ["drama", "thriller"]
        },
        {
            title: "City of God",
            year: 2002,
            rating: 4.8,
            description: "In the slums of Rio, two kids' paths diverge as one struggles to become a photographer and the other a kingpin.",
            poster: "https://m.media-amazon.com/images/M/MV5BOTMwYjc5ZmItYTFjZC00ZGQ3LTlkNTMtMjZiNTZlMWQzNzI5XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg",
            industry: "international",
            moods: ["drama", "action"]
        }
    ]
};

// Function to generate movie cards
function generateMovieCards(movies, container) {
    container.innerHTML = '';
    
    movies.forEach(movie => {
        const card = document.createElement('div');
        card.className = 'movie-card';
        
        // Add Bollywood specific class for styling
        if (movie.industry === 'bollywood') {
            card.classList.add('bollywood-card');
        }
        
        card.innerHTML = `
            <img src="${movie.poster}" alt="${movie.title}" class="movie-poster">
            <div class="movie-info">
                <h3 class="movie-title">${movie.title}</h3>
                <div class="movie-meta">
                    <span>${movie.year}</span>
                    <div class="movie-rating">
                        <i class="fas fa-star"></i>
                        <span>${movie.rating}</span>
                    </div>
                </div>
                <p class="movie-description">${movie.description}</p>
            </div>
        `;
        
        container.appendChild(card);
    });
}

// Function to filter movies by mood
function filterMoviesByMood(mood) {
    const allMovies = [...moviesData.featured, ...moviesData.hollywood, ...moviesData.bollywood, ...moviesData.international];
    const filteredMovies = allMovies.filter(movie => movie.moods.includes(mood));
    
    // Update all movie grids with filtered content
    const featuredGrid = document.getElementById('featured-movies');
    const hollywoodGrid = document.getElementById('hollywood-movies');
    const bollywoodGrid = document.getElementById('bollywood-movies');
    const internationalGrid = document.getElementById('international-movies');
    
    // Filter movies for each section
    const featuredFiltered = filteredMovies.filter(movie => moviesData.featured.some(fm => fm.title === movie.title));
    const hollywoodFiltered = filteredMovies.filter(movie => movie.industry === 'hollywood');
    const bollywoodFiltered = filteredMovies.filter(movie => movie.industry === 'bollywood');
    const internationalFiltered = filteredMovies.filter(movie => movie.industry === 'international');
    
    generateMovieCards(featuredFiltered, featuredGrid);
    generateMovieCards(hollywoodFiltered, hollywoodGrid);
    generateMovieCards(bollywoodFiltered, bollywoodGrid);
    generateMovieCards(internationalFiltered, internationalGrid);
}

// Initialize movie cards on page load
document.addEventListener('DOMContentLoaded', () => {
    const featuredGrid = document.getElementById('featured-movies');
    const hollywoodGrid = document.getElementById('hollywood-movies');
    const bollywoodGrid = document.getElementById('bollywood-movies');
    const internationalGrid = document.getElementById('international-movies');
    
    generateMovieCards(moviesData.featured, featuredGrid);
    generateMovieCards(moviesData.hollywood, hollywoodGrid);
    generateMovieCards(moviesData.bollywood, bollywoodGrid);
    generateMovieCards(moviesData.international, internationalGrid);
});
