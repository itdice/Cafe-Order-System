# Cafe Order System API

## 개요
- 음료 메뉴를 관리하고, 음료 주문 내역을 저장하여 출력해주는 **Firebase기반 API**입니다.
- 음료 메뉴 이름, 음료의 설명, 음료 이미지를 하나의 묶음으로 관리합니다.
- 음료 정보와 주문 정보를 직접 연동을 하기 때문에 **음료 정보가 변경되더라도 주문 정보에는 영향이 없습니다.**

## 기본적인 Object 정보
> Cafe Order System API에서 반환하는 Object에 닮긴 정보에 대해 설명합니다!
### menu Object
| 이름                    | 타입                 | 설명             |
|-----------------------|--------------------|----------------|
| ```id```              | **string**         | 메뉴의 고유 ID      |
| ```name```            | **string**         | 메뉴의 한글 이름      |
| ```description```     | **string**         | 메뉴에 대한 자세한 설명  |
| ```image_file_name``` | **string**         | 저장된 이미지 파일 이름  |
| ```image_src```       | **URL** (*string*) | 저장된 이미지 파일의 경로 |

### order Object
| 이름                   | 타입                       | 설명               |
|----------------------|--------------------------|------------------|
| ```id```             | **string**               | 주문의 고유 ID        |
| ```menu```           | **menu Object**          | 주문한 메뉴에 대한 정보    |
| ```menu_id```        | **reference** (*string*) | 주문한 메뉴에 대한 연관 정보 |
| ```quantity```       | **number**               | 주문 수량            |
| ```request_detail``` | **string**               | 고객의 요청사항         |

## Menu 관리
> Cafe Order System API 사용법중에서 Menu 부분에 대해서 설명합니다!
### 모든 Menu 불러오기
| 기능       | 명령어                          | 입력해야 할 정보 | 반환하는 정보             |
|----------|------------------------------|-----------|---------------------|
| Find All | ```OrderAPI.menus.findAll``` | 없음        | ```menu Object[]``` |

```javascript
const result = await ORDER_API.menus.findAll();
menus.forEach((menu) => {
    console.log(`
                    id: ${result.id}
                    name: ${result.name}
                    description: ${result.description}
                    image_file_name: ${result.image_file_name}
                    image_src: ${result.image_src}
                    `);
});
```

### 하나의 Menu 불러오기
| 기능       | 명령어                          | 입력해야 할 정보               | 반환하는 정보           |
|----------|------------------------------|-------------------------|-------------------|
| Find One | ```OrderAPI.menus.findOne``` | ```menu_id```(*string*) | ```menu Object``` |

```javascript
const result = await ORDER_API.menus.findOne("pOVD6UqkiDqCbyRod76s");
console.log(`
                    id: ${result.id}
                    name: ${result.name}
                    description: ${result.description}
                    image_file_name: ${result.image_file_name}
                    image_src: ${result.image_src}
                    `);
```

### 새로운 Menu 생성하기
| 기능     | 명령어                         | 입력해야 할 정보                             | 반환하는 정보               |
|--------|-----------------------------|---------------------------------------|-----------------------|
| Create | ```OrderAPI.menus.create``` | ```name```(*string*),```description```(*string*), ```file``` | 없음 (*console output*) |

```javascript
const nameInputField = document.body.querySelector("input.name-input");
const descriptionInputField = document.body.querySelector("input.description-input");
const fileInputField = document.body.querySelector("input.file-input");
const submitButton = document.body.querySelector("button.submit-button");

const createHandler = async () => {
    await ORDER_API.menus.crate(
        nameInputField.value, descriptionInputField.value, fileInputField.files[0]
    );
};

submitButton.addEventListener("click", createHandler);
```

### 기존 Menu 정보 업데이트 하기
| 기능           | 명령어                              | 입력해야 할 정보                                                   | 반환하는 정보               |
|--------------|----------------------------------|-------------------------------------------------------------|-----------------------|
| Update       | ```OrderAPI.menus.update```      | ```menu_id```(*string*),```newName```, ```newDescription``` | 없음 (*console output*) |
| Update Image | ```OrderAPI.menus.updateImage``` | ```menu Object```,```file```                                | 없음 (*console output*) |

> 메뉴 이름이나 메뉴 설명만 변경하는 경우 **Update**를 사용합니다!
```javascript
const updateButton = document.body.querySelector("button.update-button");

const testUpdateHandler = async () => {
    await ORDER_API.menus.update("v0znJdymtnV3FPNxWZ8n",
        "카페라떼", "라떼는 말이야 너희들처럼 당돌하지 못했어! 으이!");
};

updateButton.addEventListener("click", testUpdateHandler);
```

> 메뉴 사진을 변경하는 경우 **Update Image**를 사용합니다!
```javascript
const fileInputField = document.body.querySelector("input.file-input");
const updateImageButton = document.body.querySelector("button.update-image-button");

const updateImageHandler = async () => {
    const originMenu = await ORDER_API.menus.findOne("B8ny8oYg38tXcUvSv96l");
    await ORDER_API.menus.updateImage(originMenu, fileInputField.files[0]);
};

updateImageButton.addEventListener("click", updateImageHandler);
```

### Menu 삭제하기
| 기능     | 명령어                         | 입력해야 할 정보         | 반환하는 정보               |
|--------|-----------------------------|-------------------|-----------------------|
| Delete | ```OrderAPI.menus.delete``` | ```menu Object``` | 없음 (*console output*) |

> 삭제기능을 사용하더라도 **<span style="color: orange;">주문 정보</span>** 는 사라지지 않습니다!
```javascript
const deleteButton = document.body.querySelector("button.delete-button");

const deleteHandler = async () => {
    const menu = await ORDER_API.menus.findOne("vkBUjSaYLVXR5LJyZiNe");
    await ORDER_API.menus.delete(menu);
};

deleteButton.addEventListener("click", deleteHandler);
```

## Order 관리
> Cafe Order System API 사용법중에서 Order 부분에 대해서 설명합니다!
### 모든 Order 불러오기
| 기능       | 명령어                           | 입력해야 할 정보 | 반환하는 정보              |
|----------|-------------------------------|-----------|----------------------|
| Find All | ```OrderAPI.orders.findAll``` | 없음        | ```order Object[]``` |

```javascript
async function getOrders() {
    const orders = await ORDER_API.orders.findAll();
    orders.forEach((order) => {
        console.log(order);
    });
}

getOrders();
```

### 하나의 Order 불러오기
| 기능       | 명령어                           | 입력해야 할 정보                | 반환하는 정보            |
|----------|-------------------------------|--------------------------|--------------------|
| Find One | ```OrderAPI.orders.findOne``` | ```order_id```(*string*) | ```order Object``` |

```javascript
async function getOneOrders() {
    const firstOrder = await ORDER_API.orders.findOne("VbT4Vm1SBcgch5zjOJYe");
    const secondOrder = await ORDER_API.orders.findOne("invalid");

    console.log(firstOrder);
    console.log(secondOrder);
}

getOneOrders();
```

### 새로운 Order 생성하기
| 기능     | 명령어                          | 입력해야 할 정보                                                                        | 반환하는 정보               |
|--------|------------------------------|----------------------------------------------------------------------------------|-----------------------|
| Create | ```OrderAPI.orders.create``` | ```menu_id```(*string*),```quantity```(*number*), ```request_detail```(*string*) | 없음 (*console output*) |

```javascript
const menuInputField = document.body.querySelector("input.menu-input");
const quantityInputField = document.body.querySelector("input.quantity-input");
const requestDetailInputField = document.body.querySelector("input.request-detail-input");
const submitButton = document.body.querySelector("button.submit-button");

const createHandler = async () => {
    await ORDER_API.orders.create(
        menuInputField.value, quantityInputField.value, requestDetailInputField.value
    );
};

submitButton.addEventListener("click", createHandler);
```

### 기존 Order 정보 업데이트 하기
| 기능     | 명령어                          | 입력해야 할 정보                                                                                                          | 반환하는 정보               |
|--------|------------------------------|--------------------------------------------------------------------------------------------------------------------|-----------------------|
| Update | ```OrderAPI.orders.update``` | ```order_id```(*string*), ```menu_id```(*string*),```new_quantity```(*number*), ```new_request_detail```(*string*) | 없음 (*console output*) |

```javascript
const updateButton = document.body.querySelector("button.update-button");

const testUpdateHandler = async () => {
    await ORDER_API.orders.update("VbT4Vm1SBcgch5zjOJYe",
        "B8ny8oYg38tXcUvSv96l", 2,  "물과 에스프레소 둘 다 빼주세요.");
};

updateButton.addEventListener("click", testUpdateHandler);
```

### Order 삭제하기
| 기능     | 명령어                          | 입력해야 할 정보                | 반환하는 정보               |
|--------|------------------------------|--------------------------|-----------------------|
| Delete | ```OrderAPI.orders.delete``` | ```order_id```(*string*) | 없음 (*console output*) |

```javascript
const deleteButton = document.body.querySelector("button.delete-button");

const deleteHandler = async () => {
    await ORDER_API.orders.delete("UItVZbOiNrH3hsoXSoE2");
};

deleteButton.addEventListener("click", deleteHandler);
```