import { GET_SINGLE_BOOKMARK, GET_ALL_BOOKMARKS } from './types';

const getBookmarks = bookmarks => ({ type: GET_ALL_BOOKMARKS, bookmarks });
const getOneBookmark = slug => ({ type: GET_SINGLE_BOOKMARK, slug });

export { getBookmarks, getOneBookmark };
