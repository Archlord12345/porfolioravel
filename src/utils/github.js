const GITHUB_USERNAME = 'Archlord12345';

export const fetchTopRepos = async () => {
    try {
        const response = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=stars&per_page=10`);
        if (!response.ok) throw new Error('Failed to fetch repositories');
        const data = await response.json();

        // Filter out forks or keep them if they are significant
        return data
            .filter(repo => !repo.fork || repo.stargazers_count > 0)
            .map(repo => ({
                id: repo.id,
                name: repo.name,
                description: repo.description,
                url: repo.html_url,
                language: repo.language,
                stars: repo.stargazers_count,
                topics: repo.topics || [],
            }));
    } catch (error) {
        console.error('Error fetching GitHub data:', error);
        return [];
    }
};
