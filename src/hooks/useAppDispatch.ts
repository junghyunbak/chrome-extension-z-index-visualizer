import type { TypedUseSelectorHook } from 'react-redux';
import { useSelector } from 'react-redux';
import { State } from '@/store/State';

export const useAppSelector: TypedUseSelectorHook<State> = useSelector;
