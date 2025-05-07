
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AdminLayout from "@/components/layout/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Trash2, Plus, Save } from "lucide-react";
import { getProductById, products } from "@/data/products";
import { useToast } from "@/hooks/use-toast";
import { Product, ProductVariant } from "@/types/product";
import { createSlug } from "@/utils/helpers";

const AdminProductEdit: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const isNewProduct = id === "new";
  
  const [product, setProduct] = useState<Product>({
    id: "",
    name: "",
    description: "",
    shortDescription: "",
    price: 0,
    rating: 0,
    reviewCount: 0,
    images: ["https://images.unsplash.com/photo-1600269452121-4f2416e55c28?auto=format&fit=crop&w=800&q=80"],
    category: "",
    tags: [],
    featured: false,
    bestSeller: false,
    new: false,
    variants: [],
    inStock: true,
    slug: ""
  });

  const [tagInput, setTagInput] = useState("");
  
  // Load product data if editing existing product
  useEffect(() => {
    if (!isNewProduct && id) {
      const existingProduct = getProductById(id);
      if (existingProduct) {
        setProduct(existingProduct);
      } else {
        toast({
          title: "Product Not Found",
          description: "The product you tried to edit doesn't exist.",
          variant: "destructive"
        });
        navigate("/admin/products");
      }
    } else if (isNewProduct) {
      // Generate a unique ID for the new product
      setProduct(prev => ({
        ...prev,
        id: `product-${Date.now()}`
      }));
    }
  }, [id, isNewProduct, navigate, toast]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setProduct(prev => ({ ...prev, [name]: checked }));
    } else {
      setProduct(prev => ({ ...prev, [name]: value }));
    }
  };
  
  const handleBooleanToggle = (field: keyof Product) => {
    setProduct(prev => ({ ...prev, [field]: !prev[field] }));
  };
  
  const handleAddTag = () => {
    if (tagInput.trim() && !product.tags.includes(tagInput.trim())) {
      setProduct(prev => ({ 
        ...prev, 
        tags: [...prev.tags, tagInput.trim()]
      }));
      setTagInput("");
    }
  };
  
  const handleRemoveTag = (tagToRemove: string) => {
    setProduct(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };
  
  const handleImageChange = (index: number, url: string) => {
    const newImages = [...product.images];
    newImages[index] = url;
    setProduct(prev => ({ ...prev, images: newImages }));
  };
  
  const handleAddImage = () => {
    setProduct(prev => ({ 
      ...prev, 
      images: [...prev.images, ""] 
    }));
  };
  
  const handleRemoveImage = (index: number) => {
    if (product.images.length > 1) {
      setProduct(prev => ({
        ...prev,
        images: prev.images.filter((_, i) => i !== index)
      }));
    }
  };
  
  const handleAddVariant = () => {
    const newVariant: ProductVariant = {
      id: `${product.id}-${product.variants.length + 1}`,
      name: "",
      price: product.price,
      sku: "",
      inStock: true
    };
    
    setProduct(prev => ({
      ...prev,
      variants: [...prev.variants, newVariant]
    }));
  };
  
  const handleVariantChange = (index: number, field: keyof ProductVariant, value: any) => {
    const newVariants = [...product.variants];
    newVariants[index] = { 
      ...newVariants[index], 
      [field]: field === "price" ? parseFloat(value) : value 
    };
    
    setProduct(prev => ({ ...prev, variants: newVariants }));
  };
  
  const handleRemoveVariant = (index: number) => {
    setProduct(prev => ({
      ...prev,
      variants: prev.variants.filter((_, i) => i !== index)
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!product.name.trim()) {
      toast({
        title: "Validation Error",
        description: "Product name is required.",
        variant: "destructive"
      });
      return;
    }
    
    if (product.price <= 0) {
      toast({
        title: "Validation Error",
        description: "Price must be greater than zero.",
        variant: "destructive"
      });
      return;
    }
    
    // Generate slug from name if not present
    const updatedProduct = {
      ...product,
      slug: product.slug.trim() || createSlug(product.name)
    };
    
    // In a real app, this would make an API call to update the database
    // For this demo, we'll update the in-memory products array
    if (isNewProduct) {
      products.push(updatedProduct);
      toast({
        title: "Product Created",
        description: `${updatedProduct.name} has been created successfully.`
      });
    } else {
      const index = products.findIndex(p => p.id === updatedProduct.id);
      if (index !== -1) {
        products[index] = updatedProduct;
        toast({
          title: "Product Updated",
          description: `${updatedProduct.name} has been updated successfully.`
        });
      }
    }
    
    navigate("/admin/products");
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">
            {isNewProduct ? "Add New Product" : "Edit Product"}
          </h1>
          <div className="flex space-x-2">
            <Button onClick={() => navigate("/admin/products")} variant="outline">
              Cancel
            </Button>
            <Button onClick={handleSubmit} className="flex items-center gap-1">
              <Save className="h-4 w-4" />
              Save Product
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="md:col-span-2 space-y-6">
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Product Name</Label>
                    <Input
                      id="name"
                      name="name"
                      value={product.name}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="shortDescription">Short Description</Label>
                    <Input
                      id="shortDescription"
                      name="shortDescription"
                      value={product.shortDescription}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Full Description</Label>
                    <Textarea
                      id="description"
                      name="description"
                      rows={6}
                      value={product.description}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <h2 className="text-lg font-medium mb-4">Images</h2>
                <div className="space-y-4">
                  {product.images.map((image, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="h-16 w-16 flex-shrink-0 rounded border overflow-hidden">
                        {image ? (
                          <img src={image} alt="" className="h-full w-full object-cover" />
                        ) : (
                          <div className="h-full w-full bg-gray-100 flex items-center justify-center text-gray-400">
                            No image
                          </div>
                        )}
                      </div>
                      <Input
                        value={image}
                        placeholder="Image URL"
                        onChange={(e) => handleImageChange(index, e.target.value)}
                        className="flex-1"
                      />
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleRemoveImage(index)}
                        disabled={product.images.length <= 1}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={handleAddImage}
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Add Image
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <h2 className="text-lg font-medium mb-4">Variants</h2>
                <div className="space-y-4">
                  {product.variants.length > 0 ? (
                    product.variants.map((variant, index) => (
                      <div key={variant.id} className="grid grid-cols-12 gap-3 items-center">
                        <div className="col-span-4">
                          <Label htmlFor={`variant-name-${index}`}>Name</Label>
                          <Input
                            id={`variant-name-${index}`}
                            value={variant.name}
                            onChange={(e) => handleVariantChange(index, "name", e.target.value)}
                            placeholder="e.g. Size M, Black, etc."
                          />
                        </div>
                        <div className="col-span-2">
                          <Label htmlFor={`variant-price-${index}`}>Price</Label>
                          <Input
                            id={`variant-price-${index}`}
                            type="number"
                            value={variant.price.toString()}
                            onChange={(e) => handleVariantChange(index, "price", e.target.value)}
                          />
                        </div>
                        <div className="col-span-3">
                          <Label htmlFor={`variant-sku-${index}`}>SKU</Label>
                          <Input
                            id={`variant-sku-${index}`}
                            value={variant.sku}
                            onChange={(e) => handleVariantChange(index, "sku", e.target.value)}
                          />
                        </div>
                        <div className="col-span-2">
                          <Label htmlFor={`variant-stock-${index}`}>Stock</Label>
                          <select
                            id={`variant-stock-${index}`}
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                            value={variant.inStock ? "true" : "false"}
                            onChange={(e) => handleVariantChange(index, "inStock", e.target.value === "true")}
                          >
                            <option value="true">In Stock</option>
                            <option value="false">Out of Stock</option>
                          </select>
                        </div>
                        <div className="col-span-1 pt-6">
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => handleRemoveVariant(index)}
                            className="ml-2"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-muted-foreground text-sm mb-2">No variants added yet. Add a variant below.</p>
                  )}
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={handleAddVariant}
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Add Variant
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardContent className="pt-6">
                <h2 className="text-lg font-medium mb-4">Pricing</h2>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="price">Base Price ($)</Label>
                    <Input
                      id="price"
                      name="price"
                      type="number"
                      value={product.price}
                      onChange={handleChange}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="compareAtPrice">Compare At Price ($)</Label>
                    <Input
                      id="compareAtPrice"
                      name="compareAtPrice"
                      type="number"
                      value={product.compareAtPrice || ""}
                      onChange={handleChange}
                      placeholder="Optional"
                    />
                    <p className="text-xs text-muted-foreground">
                      Shows as the original price with a strikethrough
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <h2 className="text-lg font-medium mb-4">Organization</h2>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <select
                      id="category"
                      name="category"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      value={product.category}
                      onChange={handleChange}
                    >
                      <option value="">Select a category</option>
                      <option value="Footwear">Footwear</option>
                      <option value="Clothing">Clothing</option>
                      <option value="Accessories">Accessories</option>
                      <option value="Electronics">Electronics</option>
                      <option value="Home">Home</option>
                      <option value="Lifestyle">Lifestyle</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="tags">Tags</Label>
                    <div className="flex items-center gap-2">
                      <Input
                        id="tagInput"
                        value={tagInput}
                        onChange={(e) => setTagInput(e.target.value)}
                        placeholder="Add tag"
                        onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), handleAddTag())}
                      />
                      <Button 
                        type="button" 
                        onClick={handleAddTag} 
                        variant="outline"
                      >
                        Add
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {product.tags.map((tag) => (
                        <div
                          key={tag}
                          className="inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-medium"
                        >
                          {tag}
                          <button
                            type="button"
                            onClick={() => handleRemoveTag(tag)}
                            className="rounded-full p-0.5 hover:bg-gray-100"
                          >
                            <span className="sr-only">Remove</span>
                            <Trash2 className="h-3 w-3" />
                          </button>
                        </div>
                      ))}
                      {product.tags.length === 0 && (
                        <span className="text-xs text-muted-foreground">
                          No tags added
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <h2 className="text-lg font-medium mb-4">Status & Visibility</h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="inStock">Inventory Status</Label>
                    <select
                      id="inStock"
                      name="inStock"
                      className="h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      value={product.inStock ? "true" : "false"}
                      onChange={(e) => setProduct(prev => ({ ...prev, inStock: e.target.value === "true" }))}
                    >
                      <option value="true">In Stock</option>
                      <option value="false">Out of Stock</option>
                    </select>
                  </div>

                  <div className="flex items-center justify-between">
                    <Label htmlFor="featured">Featured Product</Label>
                    <input
                      type="checkbox"
                      id="featured"
                      checked={product.featured}
                      onChange={() => handleBooleanToggle("featured")}
                      className="h-4 w-4 rounded border-gray-300"
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Label htmlFor="bestSeller">Best Seller</Label>
                    <input
                      type="checkbox"
                      id="bestSeller"
                      checked={product.bestSeller}
                      onChange={() => handleBooleanToggle("bestSeller")}
                      className="h-4 w-4 rounded border-gray-300"
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Label htmlFor="new">Mark as New</Label>
                    <input
                      type="checkbox"
                      id="new"
                      checked={product.new}
                      onChange={() => handleBooleanToggle("new")}
                      className="h-4 w-4 rounded border-gray-300"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminProductEdit;
