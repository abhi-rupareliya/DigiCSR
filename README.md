# DigiCSR

DigiCSR is a collaborative platform designed to optimize corporate social responsibility (CSR) efforts. It facilitates effective collaboration among companies, NGOs, and beneficiaries, streamlining the funding and management of CSR projects.

## Technologies Used

- Frontend: React, Chakra UI
- Backend: Node.js, Express.js, MongoDB
- Others: TinyMCE

## Getting Started

### Frontend Setup

1. Clone the repository:
```
git clone https://github.com/your-username/digicsr-frontend.git
```

3. Navigate to the frontend directory:
```
cd digicsr-frontend
```

3. Install the dependencies:
```
npm install
```
4. Run the following command to setup the TinyMCE editor :
```
node ./tinymceSetUp.js
```

5. Start the frontend development server:
```
npm start
```

6. The frontend will be accessible at `http://localhost:3000`.

### Backend Setup

1. Clone the repository:
```
git clone https://github.com/your-username/digicsr-backend.git
```

2. Navigate to the backend directory:
```
cd digicsr-backend
```

3. Install the dependencies:
```
npm install
```

4. Create a `.env` file in the root of the backend directory and add the necessary environment variables:
```
DBURL=mongodb://localhost:27017/digicsrdb // replace with your mongoDB URI
PORT=4000
MAILER = "xxxxxx@gmail.com" // replace with your email (all the email would be sent by this mail.)
EMAILPASS = "xhwffsjwhlixgcoz" // app password for the email, refer this to get app password. [https://support.google.com/mail/answer/185833?hl=en](APP_PASS)
JWT_SEC = "anything that is secret is secret" // jwt secret for signing and verifing tokens
OTPSEC = "THIS IS SECRET" 
```

5. Start the backend server:
```
npm start
```

6. The backend will be running at `http://localhost:4000`.

## Usage

Once both the frontend and backend are set up and running, you can access the DigiCSR application by visiting `http://localhost:3000` in your web browser. The platform will provide a user-friendly interface to facilitate collaboration among companies, NGOs, and beneficiaries for CSR initiatives.
