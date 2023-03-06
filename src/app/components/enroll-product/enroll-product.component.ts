import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ConnectionService } from 'src/app/service/connection/connection.service';

@Component({
  selector: 'app-enroll-product',
  templateUrl: './enroll-product.component.html',
  styleUrls: ['./enroll-product.component.css']
})
export class EnrollProductComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private ConnectionServicervice: ConnectionService,
  ) { }

  img: any
  formData = new FormData()
  success: Boolean = false
  productData = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    description: ['', Validators.required],
    richDescription: ['', Validators.required],
    brand: ['Brand', Validators.required],
    image: ['', Validators.required],
    price: ['', Validators.required],
    category: ['636975219a87bd9ad2cb4589', Validators.required],
    countInStock: ['', Validators.required],
    rating: [100, Validators.required],
    numReviews: [100, Validators.required],
    isFeatured: [false, Validators.required],
  });

  ngOnInit(): void {
  }

  onSubmit() {
    const product = {
      name: this.productData.get('name')?.value,
      description: this.productData.get('description')?.value,
      richDescription: this.productData.get('richDescription')?.value,
      brand: this.productData.value.brand,
      price: this.productData.get('price')?.value,
      category: this.productData.value.category,
      countInStock: this.productData.get('countInStock')?.value,
      rating: this.productData.value.rating,
      numReviews: this.productData.value.numReviews,
      isFeatured: this.productData.value.isFeatured
    }
    this.setFormData(product)
    this.ConnectionServicervice.createProduct(this.formData).subscribe(data => {
      this.success = true
      this.cleanMessage()
      return data
    })
    this.productData.reset()
  }

  processFile(imageInput: any) {
    this.formData.set('image', imageInput.files[0])
  }

  setFormData(product: any) {
    this.formData.set('name', JSON.stringify(product.name).replace(/"/g, ""))
    this.formData.set('description', JSON.stringify(product.description).replace(/"/g, ""))
    this.formData.set('richDescription', JSON.stringify(product.richDescription).replace(/"/g, ""))
    this.formData.set('brand', JSON.stringify(product.brand).replace(/"/g, ""))
    this.formData.set('price', JSON.stringify(product.price).replace(/"/g, ""))
    this.formData.set('category', JSON.stringify(product.category).replace(/"/g, ""))
    this.formData.set('countInStock', JSON.stringify(product.countInStock).replace(/"/g, ""))
    this.formData.set('rating', JSON.stringify(product.rating).replace(/"/g, ""))
    this.formData.set('numReviews', JSON.stringify(product.numReviews).replace(/"/g, ""))
    this.formData.set('isFeatured', JSON.stringify(product.isFeatured).replace(/"/g, ""))
  }

  cleanMessage() {
    setTimeout(() => {
      this.success = false
    }, 4000);
  }

}
