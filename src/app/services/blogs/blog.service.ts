import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  constructor(public http: HttpClient) { }

  // url = "http://localhost:3000";x
  // url = "https://curiotory-admin-backend.onrender.com";
  url = 'https://main.recrutory-apis.com:3100';

  getAllCuriotroyBlogs() {
    console.log("getAllCuriotroyBlogs called");
    return this.http.get(`${this.url}/api/blogs`);
  }

  getCuriotroyBlogById(urlTitle: string, id: string) {
    return this.http.get(`${this.url}/api/blogs/${urlTitle}-${id}`);
  }
  
  postCuriotoryBlog(data: any) {
    return this.http.post(`${this.url}/api/blogs`, data);
  }

  patchCuriotoryBlog(id: string, data: any) {
    return this.http.patch(`${this.url}/api/blogs/${id}`, data);
  }
  

  deleteBlog(id: string) {
    return this.http.delete(`${this.url}/api/delete/blogs/${id}`);
  }
}
