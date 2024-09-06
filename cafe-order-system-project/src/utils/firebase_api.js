// IMPORT PART
import {
    initializeApp
} from "firebase/app";
import {
    getFirestore, getDocs, getDoc, doc, addDoc, updateDoc, deleteDoc, collection
} from "firebase/firestore";
import {
    getStorage, getDownloadURL, uploadBytes, deleteObject, ref
} from "firebase/storage";
import {firebaseConfig } from "../../security/firebase.js";


// INITIAL SETTINGS
const app = initializeApp(firebaseConfig);
const database = getFirestore(app);
const storage = getStorage(app);

const API = {
    // menus API PART
    menus: {
        // 모든 메뉴를 찾아오는 기능
        findAll: async () => {
            try {
                // 모든 메뉴 받아오기
                const querySnapshot = await getDocs(collection(database, "menus"));
                const menus = querySnapshot.docs.map((doc) => {
                    return { id: doc.id, ...doc.data() };
                });

                // 메뉴의 사진을 storage에서 얻어오기
                const newMenusPending = menus.map(async (menu) => {
                    const url = await getDownloadURL(
                        ref(storage, `images/${menu.image_file_name}`)
                    );

                    return { ...menu, image_src: url };
                });

                // 새로운(이미지 경로가 추가된) 메뉴 리스트 데이터 반환하기
                const newMenus = await Promise.all(newMenusPending);
                return newMenus;
            }
            catch (error) {
                return error.code;
            }
        },

        // 하나의 메뉴를 불러오는 기능
        findOne: async (id) => {
            try {
                // 하나의 메뉴 받아오기
                const docSnapshot = await getDoc(doc(database, "menus", id));

                if (docSnapshot.exists()) {
                    // 있는 메뉴인 경우
                    const menu = { id: docSnapshot.id, ...docSnapshot.data() };
                    const url = await getDownloadURL(
                        ref(storage, `images/${menu.image_file_name}`),
                    );

                    return { ...menu, image_src: url };
                }
                else {
                    // 없는 메뉴인 경우
                    return 404;
                }
            }
            catch (error) {
                return error.code;
            }
        },

        // 새로운 메뉴를 추가하는 기능
        create: async (name, description, file) => {
            // 메뉴 사진의 파일명 만들기
            const timestamp = Date.now();
            const newFileName = `${timestamp}_${file.name}`;

            // 새로운 메뉴 만들기
            const newMenu = {
                name: name, description: description,
                image_file_name: newFileName
            };

            // 업로드 하기
            try {
                await addDoc(collection(database, "menus"), newMenu);
                await uploadBytes(ref(storage, `images/${newFileName}`), file);
                console.log("New menu data created!!!");
            }
            catch (error) {
                return error.code;
            }
        },

        // 메뉴의 정보를 변경하는 기능
        update: async (id, newName, newDescription) => {
            // 새로운 이름과 설명을 생성
            const newMenu = { name: newName, description: newDescription };

            // 변경사항 업로드 하기
            try {
                await updateDoc(doc(database, "menus", id), newMenu);
                console.log("Menu data updated!!!");
            }
            catch (error) {
                return error.code;
            }
        },

        // 메뉴의 사진을 변경하는 기능
        updateImage: async (originalMenu, newFile) => {
            // 메뉴 사진의 파일명 만들기
            const timestamp = Date.now();
            const newFileName = `${timestamp}_${newFile.name}`;

            // 이미지가 수정된 메뉴 정보 만들기
            const newMenu = {
                name: originalMenu.name,
                description: originalMenu.description,
                image_file_name: newFileName
            };

            // 변경사항 업로드 하기
            try {
                await updateDoc(doc(database, "menus", originalMenu.id), newMenu);
                await deleteObject(ref(storage, `images/${originalMenu.image_file_name}`));
                await uploadBytes(ref(storage, `images/${newFileName}`), newFile);
                console.log("Menu Image updated!!!");
            }
            catch (error) {
                return error.code;
            }
        },

        // 메뉴 정보를 아예 삭제하는 기능
        delete: async (originalMenu) => {
            try {
                // 메뉴 이미지와 메뉴 데이터를 모두 삭제하기
                await deleteObject(ref(storage, `images/${originalMenu.image_file_name}`));
                await deleteDoc(doc(database, "menus", originalMenu.id));
                console.log("Menu Data Deleted!!!");
            }
            catch (error) {
                return error.code;
            }
        }
    },
    orders: {
        // 모든 주문 정보를 찾아오는 기능
        findAll: async () => {
            try {
                // 모든 주문 받아오기
                const querySnapshot = await getDocs(collection(database, "orders"));
                const orders = querySnapshot.docs.map((doc) => {
                    return { id: doc.id, ...doc.data() };
                });

                // 주문에 맞는 메뉴 정보 얻어오기
                const newOrdersPending = orders.map( async (order) => {
                    const menu = await API.menus.findOne(order.menu_id.id);
                    return {
                        id: order.id,
                        menu_id: {id: menu.id},
                        menu_name: menu.name,
                        menu_description: menu.description,
                        menu_image_file_name: menu.image_file_name,
                        menu_image_src: menu.image_src,
                        quantity: order.quantity,
                        request_detail: order.request_detail
                    };
                });

                // 메뉴 정보 반환하기
                const newOrders = await Promise.all(newOrdersPending);
                return newOrders;
            }
            catch (error) {
                return error.code;
            }
        },
        // 하나의 주문 정보를 찾아오는 기능
        findOne: async (id) => {
            try {
                // 하나의 주문 받아오기
                const docSnapshot = await getDoc(doc(database, "orders", id));

                if (docSnapshot.exists()) {
                    // 있는 주문인 경우
                    const order = { id: docSnapshot.id, ...docSnapshot.data() };
                    const menu = await API.menus.findOne(order.menu_id.id);

                    return {
                        id: order.id,
                        menu_id: {id: menu.id},
                        menu_name: menu.name,
                        menu_description: menu.description,
                        menu_image_file_name: menu.image_file_name,
                        menu_image_src: menu.image_src,
                        quantity: order.quantity,
                        request_detail: order.request_detail
                    };
                }
                else {
                    // 없는 주문인 경우
                    return 404;
                }

            }
            catch (error) {
                return error.code;
            }
        },
        create: async (menuID, quantity, requestDetail) => {
            // 새로운 order 만들기
            const newOrder = {
                menu_id: doc(database, "menus", menuID),
                quantity: quantity,
                request_detail: requestDetail
            };

            // 업로드 하기
            try {
                await addDoc(collection(database, "orders"), newOrder);
                console.log("New order data created!!!");
            }
            catch (error) {
                return error.code;
            }
        },
        update: async (id, newMenuId, newQuantity, newRequestDetail) => {
            // 바꿀 order 만들기
            const newOrder = {
                menu_id: doc(database, "menus", newMenuId),
                quantity: newQuantity,
                request_detail: newRequestDetail
            };

            // 변경사항 업로드
            try {
                await updateDoc(doc(database, "orders", id), newOrder);
                console.log("Orders data updated!!!");
            }
            catch (error) {
                return error.code;
            }
        },
        delete: async (id) => {
            try {
                await deleteDoc(doc(database, "orders", id));
                console.log("Order Data Deleted!!!");
            }
            catch (error) {
                return error.code;
            }
        }
    }
}


// EXPORT PART
export { API as ORDER_API };