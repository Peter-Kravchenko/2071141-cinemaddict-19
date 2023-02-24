import dayjs from 'dayjs';

const RELEASE_FORMAT = 'YYYY';
const POPUP_RELEASE_FORMAT = 'DD MMMM YYYY';
const POPUP_COMMENT_FORMAT = 'YYYY/MM/DD HH/mm';

export const humanizeReleazeDate = (date) => date ? dayjs(date).format(RELEASE_FORMAT) : '';

export const humanizePopupReleaseDate = (date) => date ? dayjs(date).format(POPUP_RELEASE_FORMAT) : '';

export const humanizePopupCommentDate = (date) => date ? dayjs(date).format(POPUP_COMMENT_FORMAT) : '';
