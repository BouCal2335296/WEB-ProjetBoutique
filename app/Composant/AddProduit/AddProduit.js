import { useState, useEffect } from "react";
import db from '../../lib/localbase';

export default function AddProduit() {
    return (
        <div id="app" class="container-fluid">
            <div class="left-panel">
                <input type="text" placeholder="Lien Image" />
            </div>
            <div class="right-panel">
                <div class="title-box beige-box">
                    <input type="text" placeholder="Titre du produit" />
                </div>
                <div class="description-box beige-box">
                    <textarea placeholder="Description du produit..."></textarea>
                </div>
                <div class="small-boxes">
                    <div>
                        <input type="number" step="1" min="0" placeholder="12" />
                    </div>
                    <div>
                        <input type="number" step="0.01" min="0" placeholder="12.50" />
                    </div>
                </div>
            </div>
        </div>
    );
}