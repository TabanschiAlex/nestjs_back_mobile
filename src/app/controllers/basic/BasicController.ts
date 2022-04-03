import { Response } from 'express';
import { BasicQueryRequest } from '../../requests/BasicQueryRequest';
import { BasicRequest } from '../../requests/BasicRequest';

export interface BasicController {
  index(query: BasicQueryRequest, res: Response);

  edit(id: string, res: Response);

  store(request: BasicRequest, res: Response);

  update(id: string, request: BasicRequest, res: Response);

  destroy(id: string, res: Response);
}
