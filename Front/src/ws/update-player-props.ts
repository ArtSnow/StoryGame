import { Property } from '../service/state';

export const UpdatePlayerPropsName = 'update-player-props';

export type UpdatePlayerPropsBody = {
    id: string
    properties: Property[]
};
