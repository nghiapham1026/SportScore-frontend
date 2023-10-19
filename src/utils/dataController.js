// dataController.js
import { fetchData } from './fetchData';

export const fetchFixtures = async (queryParams) => {
  try {
    const endpoint = `/fixtures/db/getFixtures`;
    const response = await fetchData(endpoint, 'GET', null, queryParams);
    return response.allFixtures;
  } catch (err) {
    throw err;
  }
};

export const fetchStatistics = async (queryParams) => {
    try {
        const endpoint = `/fixtures/db/getStatistics`;
        const response = await fetchData(endpoint, 'GET', null, queryParams);
        return response.allFixtureStatistics;
    } catch (err) {
        throw err;
    }
};

export const fetchHeadToHead = async (queryParams) => {
    try {
        const endpoint = `/fixtures/db/getHeadToHead`;
        const response = await fetchData(endpoint, 'GET', null, queryParams);
        return response.allHeadToHeadFixtures;
    } catch (err) {
        throw err;
    }
};

export const getLeagues = async (queryParams) => {
    try {
        const endpoint = `/leagues/db/getLeagues`;
        const response = await fetchData(endpoint, 'GET', null, queryParams);
        return response.allLeagues;
    } catch (err) {
        throw err;
    }
};

export const getStandings = async (queryParams) => {
    try {
        const endpoint = `/standings/db/getStandings`;
        const response = await fetchData(endpoint, 'GET', null, queryParams);
        return response.standings;
    } catch (err) {
        throw err;
    }
};

export const getEvents = async (queryParams) => {
    try {
        const endpoint = `/fixtures/db/getEvents`;
        const response = await fetchData(endpoint, 'GET', null, queryParams);
        return response.allFixtureEvents;
    } catch (err) {
        throw err;
    }
};