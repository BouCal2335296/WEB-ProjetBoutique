import { useState, useEffect } from "react";
import db from '../../lib/localbase';

export default function Connexion() {

    function Register(event) {
        event.preventDefault(); // ✅ à faire en premier

        const formData = new FormData(event.target);
        const LastName = formData.get('LastName');
        const FirstName = formData.get('FirstName');
        const AddressLine = formData.get('AddressLine');
        const City = formData.get('City');
        const CP = formData.get('CP');
        const Email = formData.get('Email');
        const UserName = formData.get('UserName');
        const Password = formData.get('Password');

        fetch('https://projet-prog4e07.cegepjonquiere.ca/api/Accounts/register-utilisateur', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                LastName: LastName,
                FirstName: FirstName,
                UserName: UserName,
                AddressLine: AddressLine,
                City: City,
                CP: CP,
                Email: Email,
                Password: Password
            })
        })
            .then(response => {
                if (response.status === 200) {
                    login(UserName, Password);
                }
            })
            .catch(err => {
                console.error("Erreur lors de l'inscription");
            });
    }

    function login(UserName, Password) {

        fetch('https://projet-prog4e07.cegepjonquiere.ca/api/Accounts/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                Username: UserName,
                Password: Password
            })
        })
            .then(response => response.json())
            .then(data => {
                if (data.token) {
                    stockerToken(data.token, data.userName, data.role);
                }
            })
            .catch(err => {
                console.error("Erreur lors de la connexion");
            });
    }

    return (
        <div className="formulaire p-3 shadow-sm">
            <form onSubmit={Register}>
                <div className="mb-3">
                    <label htmlFor="LastName" className="form-label fw-semibold">Nom de Famille</label>
                    <input
                        type="text"
                        id="LastName"
                        name="LastName"
                        className="form-control"
                        placeholder="Ex: Durand"
                        required
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="FirstName" className="form-label fw-semibold">Prénom</label>
                    <input
                        type="text"
                        id="FirstName"
                        name="FirstName"
                        className="form-control"
                        placeholder="Ex: Claire"
                        required
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="UserName" className="form-label fw-semibold">Nom d'utilisateur</label>
                    <input
                        type="text"
                        id="UserName"
                        name="UserName"
                        className="form-control"
                        placeholder="Ex: claire.durand"
                        required
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="AddressLine" className="form-label fw-semibold">Addresse</label>
                    <input
                        type="text"
                        id="AddressLine"
                        name="AddressLine"
                        className="form-control"
                        placeholder="Ex: 12 Avenue des Champs-Élysées"
                        required
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="City" className="form-label fw-semibold">Ville</label>
                    <input
                        type="text"
                        id="City"
                        name="City"
                        className="form-control"
                        placeholder="Ex: Paris"
                        required
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="CP" className="form-label fw-semibold">Code Postal</label>
                    <input
                        type="text"
                        id="CP"
                        name="CP"
                        className="form-control"
                        placeholder="Ex: 75008"
                        required
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="Email" className="form-label fw-semibold">Email</label>
                    <input
                        type="email"
                        id="Email"
                        name="Email"
                        className="form-control"
                        placeholder="Ex: claire.durand@example.com"
                        required
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="Password" className="form-label fw-semibold">Mot de passe</label>
                    <input
                        type="password"
                        id="Password"
                        name="Password"
                        className="form-control"
                        placeholder="Ex: VielleCamomille1874!"
                        required
                    />
                </div>

                <div className="text-end">
                    <button type="submit" className="buttonBurger">Connexion</button>
                </div>
            </form>
        </div>

    );
}

function stockerToken(token, userName, role) {
    db.collection('tokens').doc({ id: 'jwt' }).set({
        id: 'jwt',
        token: token,
        username: userName,
        role: role
    });
}


//ERREUR CAR LE TOKEN N'EST PAS STOCKER DANS LE LOCALSTORAGE
//No Documents found in tokens Collection with criteria {"id":"jwt"}.