// @ts-ignore
import request from '@/utils/request';
import {stringify} from 'qs';

export async function query(params) {
  return request(`/api/chapter?${stringify(params)}`);
}


export async function execute(params) {
  return request(`/api/app/dojson.json?busiNo=${params.busiNo}&jsonParam=${JSON.stringify(params)}`);
}
