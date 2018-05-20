/* @flow */

export type Props = {
  retry?: mixed => mixed,
  error?: mixed,
  loading?: boolean,
  timedOut?: boolean,
  pastDelay?: boolean
};
