var card = Vue.createApp({
    data() {
        return {
            cards: [], // 初始化 cards 為空陣列
        };
    },
    mounted() {
        // 使用 jQuery 的 $.ajax 發送請求
        $.ajax({
            url: "/profolio", // API 路徑
            method: "GET",    // HTTP 方法
            dataType: "json", // 資料格式
            success: (results) => {
                this.cards = results; // 將回傳的資料綁定到 Vue 的 cards
            },
            error: (xhr, status, error) => {
                console.error("Error fetching data:", status, error);
            },
        });
    },
});

// 掛載 Vue 應用程式到指定的 DOM 元素
card.mount("#card");
