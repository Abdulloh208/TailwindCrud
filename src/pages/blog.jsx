import { db } from "../firebase";
import { useState, useEffect } from "react";
import { collection, addDoc, deleteDoc, doc, updateDoc, onSnapshot } from "firebase/firestore";
import { v4 as uuidv4 } from 'uuid';
import { notification } from 'antd';
import { async } from "@firebase/util";

const Blog = () => {
    const [blog, setBlog] = useState([]);
    const [title, setTitle] = useState('');
    const [descript, setDescript] = useState('');
    const [img, setImg] = useState('');
    const [show, setShow] = useState(true);
    const [id, setId] = useState('');

    useEffect(() => {
        const dataBase = collection(db, 'blogs');

        const unsubscribe = onSnapshot(dataBase, (snapshot) => {
            const malumot = snapshot.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id,
            }));
            setBlog(malumot);
        });

        return () => unsubscribe(); 
    }, []);

    const database = collection(db, "blogs");

    const HandleCreate = async (e) => {
        if (title == "" || descript == "" || img == "") {
            return notification.error({
                message: "Ma'lumotlaringiz to'liq emas.",
                description: "Ma'lumotlarni qaytadan kiriting❗️"
            })
        }

        else {
            e.preventDefault();

            await addDoc(database, {
                img: img,
                descript: descript,
                title: title,
                id: uuidv4()
            });
            notification.success({
                message: "Ma'lumotlaringiz muvaffaqiyatli kiritildi😊",
                description: "Ro'yxatni ko'ring❗️"
            })

            setTitle("");
            setDescript("");
            setImg("");

        }

    };

    const HandleDeleteCard = async (id) => {
        const deletePost = doc(db, "blogs", id);
        await deleteDoc(deletePost);
    };

    const HandleEdit = async (id, title, descript, img) => {
        setId(id);
        setTitle(title);
        setDescript(descript);
        setImg(img);
        setShow(false)
    }

    const HandleUptade = async () => {
        const uptadeData = doc(db, 'blogs', id);
        await updateDoc(uptadeData, { title, descript, img }); 
    }

    return (
        <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
            <div className="relative py-3 sm:max-w-xl sm:mx-auto">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-green-400 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
                <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
                    <h1 className="text-4xl font-bold text-center text-blue-500 mb-8">Create Blog Post</h1>
                    <form className="space-y-6">
                        <div>
                            <label htmlFor="title" className="text-xl font-medium text-blue-500 block">Title:</label>
                            <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} className="border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                        </div>
                        <div>
                            <label htmlFor="descript" className="text-xl font-medium text-blue-500 block">Description:</label>
                            <input type="text" id="descript" value={descript} onChange={(e) => setDescript(e.target.value)} className="border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                        </div>
                        <div>
                            <label htmlFor="img" className="text-xl font-medium text-blue-500 block">Image URL:</label>
                            <input type="text" id="img" value={img} onChange={(e) => setImg(e.target.value)} className="border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                        </div>
                        <div className="flex justify-center">
                            {show ? <button className="border rounded-lg px-6 py-3 mt-4 bg-green-500 text-white hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50" onClick={HandleCreate}>Create</button> : <button className="border rounded-lg px-6 py-3 mt-4 bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50" onClick={HandleUptade}>Update</button>}
                        </div>
                    </form>
                </div>
            </div>
            <div className="mt-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {blog.map((data) => (
                        <div key={data.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-lg">
                            <img className="w-full h-56 object-cover object-center" src={data.img} alt="blog-img" />
                            <div className="p-6">
                                <h2 className="text-xl font-medium text-gray-800 mb-2">{data.title}</h2>
                                <p className="text-gray-600 mb-4">{data.descript}</p>
                                <div className="flex justify-between">
                                    <button className="border rounded-lg px-4 py-2 bg-red-500 text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50" onClick={() => HandleDeleteCard(data.id)}>Delete</button>
                                    <button className="border rounded-lg px-4 py-2 bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 ml-2" onClick={() => HandleEdit(data.id, data.title, data.descript, data.img)}>Edit</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export { Blog };
