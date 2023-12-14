// dataController.js
import { fetchData } from './fetchData';

const getDataOrFallback = (response, key) => {
    return response[key] !== undefined ? response[key] : response;
};

export const fetchFixtures = async (queryParams) => {
    try {
        const endpoint = `/fixtures/db/getFixtures`;
        const response = await fetchData(endpoint, 'GET', null, queryParams);
        return getDataOrFallback(response, 'allFixtures');
    } catch (err) {
        console.error('Error fetching fixtures:', err);
        return { error: 'Failed to fetch fixtures', details: err.message };
    }
};

export const fetchStatistics = async (queryParams) => {
    try {
        const endpoint = `/fixtures/db/getStatistics`;
        const response = await fetchData(endpoint, 'GET', null, queryParams);
        return getDataOrFallback(response, 'allFixtureStatistics');
    } catch (err) {
        console.error('Error fetching statistics:', err);
        return { error: 'Failed to fetch statistics', details: err.message };
    }
};

export const fetchHeadToHead = async (queryParams) => {
    try {
        const endpoint = `/fixtures/db/getHeadToHead`;
        const response = await fetchData(endpoint, 'GET', null, queryParams);
        return getDataOrFallback(response, 'allHeadToHeadFixtures');
    } catch (err) {
        console.error('Error fetching head-to-head data:', err);
        return { error: 'Failed to fetch head-to-head data', details: err.message };
    }
};

export const getLeagues = async (queryParams) => {
    try {
        const endpoint = `/leagues/db/getLeagues`;
        const response = await fetchData(endpoint, 'GET', null, queryParams);
        return getDataOrFallback(response, 'allLeagues');
    } catch (err) {
        console.error('Error fetching leagues:', err);
        return { error: 'Failed to fetch leagues', details: err.message };
    }
};

export const getStandings = async (queryParams) => {
    try {
        const endpoint = `/standings/db/getStandings`;
        const response = await fetchData(endpoint, 'GET', null, queryParams);
        return getDataOrFallback(response, 'standings');
    } catch (err) {
        console.error('Error fetching standings:', err);
        return { error: 'Failed to fetch standings', details: err.message };
    }
};

export const getEvents = async (queryParams) => {
    try {
        const endpoint = `/fixtures/db/getEvents`;
        const response = await fetchData(endpoint, 'GET', null, queryParams);
        return getDataOrFallback(response, 'allFixtureEvents');
    } catch (err) {
        console.error('Error fetching events:', err);
        return { error: 'Failed to fetch events', details: err.message };
    }
};

export const getTeams = async (queryParams) => {
    try {
        const endpoint = `/teams/db/getTeams`;
        const response = await fetchData(endpoint, 'GET', null, queryParams);
        return getDataOrFallback(response, 'allTeams');
    } catch (err) {
        console.error('Error fetching teams:', err);
        return { error: 'Failed to fetch teams', details: err.message };
    }
};

export const getSquads = async (queryParams) => {
    try {
        const endpoint = `/players/db/getSquads`;
        const response = await fetchData(endpoint, 'GET', null, queryParams);
        return getDataOrFallback(response, 'allSquads');
    } catch (err) {
        console.error('Error fetching squads:', err);
        return { error: 'Failed to fetch squads', details: err.message };
    }
};

export const getTopScorers = async (queryParams) => {
    try {
        const endpoint = `/players/db/getTopScorers`;
        const response = await fetchData(endpoint, 'GET', null, queryParams);
        return getDataOrFallback(response, 'topScorers');
    } catch (err) {
        console.error('Error fetching top scorers:', err);
        return { error: 'Failed to fetch top scorers', details: err.message };
    }
};

export const getTopAssists = async (queryParams) => {
    try {
        const endpoint = `/players/db/getTopAssists`;
        const response = await fetchData(endpoint, 'GET', null, queryParams);
        return getDataOrFallback(response, 'allAssists');
    } catch (err) {
        console.error('Error fetching top assists:', err);
        return { error: 'Failed to fetch top assists', details: err.message };
    }
};
