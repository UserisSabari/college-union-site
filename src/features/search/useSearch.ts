import { useState, useEffect } from 'react';
import membersData from '../../data/members.json';
import eventsData from '../../data/events.json';
import announcementsData from '../../data/announcements.json';
import initiativesData from '../../data/initiatives.json';
import type { Member, Event, Announcement, Initiative } from '../../types';

export interface SearchResultItem {
  id: string;
  type: 'member' | 'event' | 'notice' | 'initiative';
  title: string;
  subtitle: string;
  url: string;
  date?: string;
  badge?: string;
}

export interface GroupedSearchResults {
  members: SearchResultItem[];
  events: SearchResultItem[];
  notices: SearchResultItem[];
  initiatives: SearchResultItem[];
}

export const useSearch = (query: string) => {
  const [debouncedQuery, setDebouncedQuery] = useState(query);
  const [results, setResults] = useState<GroupedSearchResults>({
    members: [],
    events: [],
    notices: [],
    initiatives: [],
  });

  // Debounce query
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query);
    }, 200);

    return () => clearTimeout(handler);
  }, [query]);

  useEffect(() => {
    const term = debouncedQuery.trim().toLowerCase();
    if (term === '') {
      setResults({ members: [], events: [], notices: [], initiatives: [] });
      return;
    }

    // 1. Search Members
    const matchedMembers = (membersData as Member[])
      .filter(
        (m) =>
          m.name.toLowerCase().includes(term) ||
          m.position.toLowerCase().includes(term) ||
          m.department.toLowerCase().includes(term)
      )
      .slice(0, 3)
      .map(
        (m): SearchResultItem => ({
          id: m.id,
          type: 'member',
          title: m.name,
          subtitle: `${m.position} • Dept of ${m.department} (Semester ${m.semester})`,
          url: m.category === 'officeBearer' ? '/office-bearers' : '/representatives',
          badge: m.position,
        })
      );

    // 2. Search Events
    const matchedEvents = (eventsData as Event[])
      .filter(
        (e) =>
          e.title.toLowerCase().includes(term) ||
          e.description.toLowerCase().includes(term) ||
          e.venue.toLowerCase().includes(term)
      )
      .slice(0, 3)
      .map(
        (e): SearchResultItem => ({
          id: e.id,
          type: 'event',
          title: e.title,
          subtitle: `Venue: ${e.venue}`,
          url: '/events',
          date: e.date,
          badge: e.category,
        })
      );

    // 3. Search Announcements
    const matchedNotices = (announcementsData as Announcement[])
      .filter(
        (a) =>
          a.title.toLowerCase().includes(term) ||
          a.body.toLowerCase().includes(term) ||
          a.tags.some((tag) => tag.toLowerCase().includes(term))
      )
      .slice(0, 3)
      .map(
        (a): SearchResultItem => ({
          id: a.id,
          type: 'notice',
          title: a.title,
          subtitle: a.body,
          url: '/news',
          date: a.publishedAt,
          badge: a.category,
        })
      );

    // 4. Search Initiatives
    const matchedInitiatives = (initiativesData as Initiative[])
      .filter(
        (i) =>
          i.title.toLowerCase().includes(term) ||
          i.description.toLowerCase().includes(term)
      )
      .slice(0, 3)
      .map(
        (i): SearchResultItem => ({
          id: i.id,
          type: 'initiative',
          title: i.title,
          subtitle: i.description,
          url: '/initiatives',
          badge: i.status,
        })
      );

    setResults({
      members: matchedMembers,
      events: matchedEvents,
      notices: matchedNotices,
      initiatives: matchedInitiatives,
    });
  }, [debouncedQuery]);

  return results;
};
