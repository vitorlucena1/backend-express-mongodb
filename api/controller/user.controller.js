import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const register = async (req, res) => {
    console.log("Registering user", req.body);
    const { username, email, password } = req.body;

    // Validação dos campos
    if (!username || !email || !password) {
        return res.status(400).json({ message: "Username, email, and password are required" });
    }

    // Validação do formato do email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ message: "Invalid email format" });
    }

    // Validação da senha
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/; // Pelo menos 8 caracteres, 1 letra e 1 número
    if (!passwordRegex.test(password)) {
        return res.status(400).json({ 
            message: "Password must be at least 8 characters long and include at least one letter and one number" 
        });
    }

    try {
        // Verifica se o email ou username já existem
        const existingUser = await User.findOne({ $or: [{ username }, { email }] });
        if (existingUser) {
            return res.status(400).json({ message: "Username or email already exists" });
        }

        // Criptografa a senha
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Cria o novo usuário
        const savedUser = await User.create({
            username,
            email,
            password: hashedPassword,
        });

        console.log("Saved user:", savedUser);
        return res.status(200).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error("Error saving user", error);
        return res.status(500).json({ message: `Error saving user: ${error}` });
    }
};

const login = async (req, res) => {
    console.log("Logging in user", req.body);
    const { username, email, password } = req.body;

    // Validação dos campos
    if (!password || (!username && !email)) {
        return res.status(400).json({ message: "Username or email and password are required" });
    }

    try {
        // Busca o usuário por username ou email
        const user = await User.findOne({ $or: [{ username }, { email }] }).select('+password');
        if (!user) {
            console.log("User not found");
            return res.status(400).json({ message: 'User not found' });
        }

        // Verifica se a senha está correta
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Gera o token JWT
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        return res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        console.error("Error logging in user", error);
        return res.status(500).json({ message: `Error logging in user: ${error}` });
    }
};

const getAllUsers = async (req, res) => {
    try {
        console.log("Fetching all users...");
        const users = await User.find({}, { password: 0 }); // Exclui o campo 'password' dos resultados
        console.log("Users fetched successfully:", users);
        return res.status(200).json(users);
    } catch (error) {
        console.error("Error fetching users:", error.message);
        return res.status(500).json({ message: `An error occurred while fetching users: ${error.message}` });
    }
};

export default { register , login, getAllUsers };