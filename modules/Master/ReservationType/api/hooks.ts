import { useQuery } from '@tanstack/react-query';
import { reservationTypeQueries } from './query';

export function useReservationTypeOptions(enabled: boolean = true) {
  return useQuery({
    ...reservationTypeQueries.Options(),
    enabled,
    select: result => result.data,
  });
}
