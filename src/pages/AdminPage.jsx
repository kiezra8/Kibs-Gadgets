import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

export default function AdminPage({ onBack }) {
    const { products, categories, getImg, addToast, refreshProducts } = useApp();
    const [editingProduct, setEditingProduct] = useState(null);
    const [isSaving, setIsSaving] = useState(false);

    const handleSave = async (e) => {
        e.preventDefault();
        setIsSaving(true);
        try {
            const formData = new FormData(e.target);
            const file = formData.get('image');

            let imageUrl = editingProduct?.defaultImg || '';
            const { nhost } = await import('../nhost');

            // Upload new image
            if (file && file.size > 0) {
                try {
                    const { fileMetadata, error } = await nhost.storage.upload({ file });
                    if (error) throw error;
                    // generate public URL
                    imageUrl = nhost.storage.getPublicUrl({ fileId: fileMetadata.id });
                } catch (err) {
                    addToast('Nhost Storage error: ' + err.message, '❌');
                    setIsSaving(false);
                    return;
                }
            }

            const payload = {
                name: formData.get('name'),
                category: formData.get('category'),
                condition: formData.get('condition'),
                price: parseFloat(formData.get('price')),
                oldPrice: formData.get('oldPrice') ? parseFloat(formData.get('oldPrice')) : null,
                discount: formData.get('discount') ? parseFloat(formData.get('discount')) : 0,
                description: formData.get('description'),
                defaultImg: imageUrl,
            };

            try {
                if (editingProduct && editingProduct.id) {
                    // Update
                    const MUTATION = `
                        mutation UpdateProduct($id: uuid!, $data: products_set_input!) {
                            update_products_by_pk(pk_columns: {id: $id}, _set: $data) {
                                id
                            }
                        }
                    `;
                    const { error } = await nhost.graphql.request(MUTATION, { id: editingProduct.id, data: payload });
                    if (error) throw error[0];
                } else {
                    // Insert
                    const MUTATION = `
                        mutation InsertProduct($data: products_insert_input!) {
                            insert_products_one(object: $data) {
                                id
                            }
                        }
                    `;
                    const { error } = await nhost.graphql.request(MUTATION, { data: payload });
                    if (error) throw error[0];
                }

                addToast('Product saved to Nhost!', '✅');
                refreshProducts();
                setEditingProduct(null);
            } catch (err) {
                addToast('Database Error: ' + (err.message || 'Check permissions'), '❌');
            }
        } catch (error) {
            console.error(error);
            addToast('Error saving: ' + error.message, '❌');
        } finally {
            setIsSaving(false);
        }
    };

    if (editingProduct) {
        return (
            <div className="admin-page" style={{ paddingBottom: 80 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: 14 }}>
                    <button onClick={() => setEditingProduct(null)} style={{ border: 'none', background: 'none', fontSize: 20 }}>←</button>
                    <h2 style={{ fontSize: 18, fontWeight: 800 }}>{editingProduct.id ? 'Edit Product' : 'Add Product'}</h2>
                </div>

                <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: 14, padding: 14, background: 'white', borderRadius: 12 }}>

                    {/* Image Preview */}
                    {editingProduct.defaultImg && (
                        <img src={editingProduct.defaultImg} alt="Preview" style={{ width: '100%', height: 200, objectFit: 'cover', borderRadius: 'var(--radius-md)' }} />
                    )}

                    <div className="input-group">
                        <label>Upload New Image (Gallery)</label>
                        <input type="file" name="image" accept="image/*" />
                    </div>

                    <div className="input-group">
                        <label>Name</label>
                        <input type="text" name="name" defaultValue={editingProduct.name} required />
                    </div>

                    <div className="input-group">
                        <label>Category</label>
                        <select name="category" defaultValue={editingProduct.category} style={{ padding: '12px 14px', border: '2px solid var(--border)', borderRadius: 'var(--radius-md)' }} required>
                            {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                        </select>
                    </div>

                    <div className="input-group">
                        <label>Condition</label>
                        <select name="condition" defaultValue={editingProduct.condition || 'new'} style={{ padding: '12px 14px', border: '2px solid var(--border)', borderRadius: 'var(--radius-md)' }}>
                            <option value="new">New</option>
                            <option value="used">Used</option>
                        </select>
                    </div>

                    <div className="input-group">
                        <label>Price (UGX)</label>
                        <input type="number" name="price" defaultValue={editingProduct.price} required />
                    </div>

                    <div className="input-group">
                        <label>Old Price (Optional)</label>
                        <input type="number" name="oldPrice" defaultValue={editingProduct.oldPrice || ''} />
                    </div>

                    <div className="input-group">
                        <label>Discount % (Optional)</label>
                        <input type="number" name="discount" defaultValue={editingProduct.discount || ''} />
                    </div>

                    <div className="input-group">
                        <label>Description</label>
                        <textarea name="description" defaultValue={editingProduct.description} style={{ padding: '12px 14px', border: '2px solid var(--border)', borderRadius: 'var(--radius-md)', minHeight: 80 }} required />
                    </div>

                    <button type="submit" className="btn-primary" disabled={isSaving}>
                        {isSaving ? 'Saving to Nhost...' : '💾 Save Product'}
                    </button>
                </form>
            </div>
        );
    }

    return (
        <div className="admin-page">
            <div className="admin-header">
                <button onClick={onBack} style={{ background: 'rgba(255,255,255,0.15)', border: 'none', borderRadius: 10, width: 36, height: 36, cursor: 'pointer', color: 'white', fontSize: 18, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>←</button>
                <div className="admin-header-icon"><span style={{ fontSize: 24 }}>🔐</span></div>
                <div>
                    <div className="admin-header-title">Admin Dashboard</div>
                    <div className="admin-header-sub">Nhost Connected</div>
                </div>
            </div>

            <div style={{ background: 'rgba(46, 204, 113, 0.1)', padding: 12, borderRadius: 10, color: '#27ae60', fontSize: 13, fontWeight: 700, marginBottom: 14 }}>
                ✅ Nhost connected perfectly! Add or edit products below. Changes will sync to your secure Postgres database and storage.
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
                <h3 style={{ fontSize: 16, fontWeight: 800 }}>Products</h3>
                <button onClick={() => setEditingProduct({})} className="btn-primary" style={{ padding: '8px 16px', fontSize: 12, flex: 'none' }}>
                    + Add Product
                </button>
            </div>

            {products.map(prod => (
                <div className="admin-card" key={prod.id} style={{ alignItems: 'center' }}>
                    <img className="admin-card-img" src={getImg('product', prod.id, prod.defaultImg)} alt={prod.name} />
                    <div className="admin-card-info">
                        <div className="admin-card-name" style={{ fontSize: 13, lineHeight: 1.3 }}>{prod.name}</div>
                        <div className="admin-card-sub" style={{ margin: '4px 0 0' }}>{prod.price.toLocaleString()} UGX · {prod.condition}</div>
                    </div>
                    <button
                        onClick={() => setEditingProduct(prod)}
                        style={{ padding: '8px 12px', background: 'var(--primary)', color: 'white', border: 'none', borderRadius: 8, fontWeight: 700, fontSize: 11, cursor: 'pointer' }}
                    >
                        ✏️ Edit
                    </button>
                </div>
            ))}
            <div style={{ height: 40 }} />
        </div>
    );
}
