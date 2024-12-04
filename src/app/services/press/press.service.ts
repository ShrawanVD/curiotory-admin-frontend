import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PressService {

  constructor(public http: HttpClient) { }

  // url = "http://localhost:3000";
  // url = "https://curiotory-admin-backend.onrender.com";
  url = 'https://main.recrutory-apis.com:3100';

  getAllPress() {
    return this.http.get(`${this.url}/api/press`);
  }

  getPressById(urlTitle: string,id: string) {
    return this.http.get(`${this.url}/api/press/${urlTitle}-${id}`);
  }
  
  addPress(data: any) {
    return this.http.post(`${this.url}/api/press`, data);
  }

  editPress(id: string, data: any) {
    console.log("inside the edit services of press");
    return this.http.patch(`${this.url}/api/press/${id}`, data);
  }
  

  deletePress(id: string) {
    return this.http.delete(`${this.url}/api/delete/press/${id}`);
  }
}
