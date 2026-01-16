// handles visit counting - calls the backend API if available, otherwise uses localStorage
const API_BASE_URL = process.env.REACT_APP_VISIT_COUNTER_API || '';

export interface VisitCounterResponse {
  count: number;
  success: boolean;
}

// increments the counter and returns the new count
export const incrementVisitCount = async (): Promise<number | null> => {
  // no API configured? just use localStorage
  if (!API_BASE_URL) {
    return getLocalVisitCount();
  }

  try {
    const response = await fetch(`${API_BASE_URL}/api/visits/increment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to increment visit count');
    }

    const data: VisitCounterResponse = await response.json();
    return data.count;
  } catch (error) {
    console.error('Error incrementing visit count:', error);
    // API failed, fallback to localStorage
    return getLocalVisitCount();
  }
};

// gets the current count without incrementing
export const getVisitCount = async (): Promise<number | null> => {
  // no API? just read from localStorage
  if (!API_BASE_URL) {
    const stored = localStorage.getItem('localVisitCount');
    return stored ? parseInt(stored, 10) : 0;
  }

  try {
    const response = await fetch(`${API_BASE_URL}/api/visits`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to get visit count');
    }

    const data: VisitCounterResponse = await response.json();
    return data.count;
  } catch (error) {
    console.error('Error getting visit count:', error);
    // API failed, use localStorage
    const stored = localStorage.getItem('localVisitCount');
    return stored ? parseInt(stored, 10) : 0;
  }
};

// fallback function - uses localStorage (only works locally, not shared)
const getLocalVisitCount = (): number => {
  const stored = localStorage.getItem('localVisitCount');
  if (stored) {
    const count = parseInt(stored, 10) + 1;
    localStorage.setItem('localVisitCount', count.toString());
    return count;
  } else {
    localStorage.setItem('localVisitCount', '1');
    return 1;
  }
};
