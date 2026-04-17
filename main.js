const img = document.createElement('img');
function calculateScore() {
    let age = parseInt(document.getElementById("age").value);
    let sex = document.getElementById("sex").value;
    let smoking = document.getElementById("smoking").value;
    let sbp = parseInt(document.getElementById("bp").value);
    let chol = parseFloat(document.getElementById("chol").value);

    if (!age || !sbp || !chol) {
        document.getElementById("result").innerHTML =
            "⚠️ Заповніть всі поля для розрахунку SCORE2";
        return;
    }

    // =========================
    // 1. BASE CLINICAL WEIGHTS (ESC-like structure)
    // =========================

    let ageScore =
        age < 50 ? 2 :
        age < 55 ? 4 :
        age < 60 ? 6 :
        age < 65 ? 8 :
        age < 70 ? 10 : 12;

    let sbpScore =
        sbp < 120 ? 0 :
        sbp < 130 ? 1 :
        sbp < 140 ? 2 :
        sbp < 160 ? 3 :
        sbp < 180 ? 4 : 5;

    let cholScore =
        chol < 4 ? 0 :
        chol < 5 ? 1 :
        chol < 6 ? 2 :
        chol < 7 ? 3 : 4;

    let smokingScore = smoking === "yes" ? 5 : 0;
    let sexScore = sex === "male" ? 2 : 0;

    let total = ageScore + sbpScore + cholScore + smokingScore + sexScore;

    // =========================
    // 2. EUROPEAN RISK REGION MODEL (simplified ESC concept)
    // =========================

    // We assume "moderate risk region" (Central/Eastern Europe approximation)
    let regionMultiplier = 1.25;

    let risk = 0;

    if (age < 50) {
        risk = total * 0.6 * regionMultiplier;
    } else if (age < 60) {
        risk = total * 0.9 * regionMultiplier;
    } else if (age < 70) {
        risk = total * 1.3 * regionMultiplier;
    } else {
        risk = total * 1.7 * regionMultiplier;
    }

    // cap clinically plausible values
    if (risk > 40) risk = 40;

    // =========================
    // 3. ESC RISK CATEGORIES
    // =========================

    let category = "";
    let color = "";
    let advice = "";

    function onList() {
        const listElement = document.getElementById("onList");
        if (!listElement) return;
    
        // Очищаємо контейнер і створюємо структуру через Flexbox
        listElement.style.display = "flex";
        listElement.style.alignItems = "center";
        listElement.style.justifyContent = "space-between";
        listElement.style.marginTop = "20px";
    
        listElement.innerHTML = `
            <div style="flex: 1; font-size: 22px; font-weight: bold; color: #ff0000; text-align: left; line-height: 1.2;">
                Записатися до лікаря та<br>отримати рекомендації:<br>
                <span style="font-size: 26px;">+0960833349</span>
            </div>
            <div style="flex: 0 0 80px; margin-left: 15px;">
                <img src="img/symbol.png" alt="Емблема" style="width: 100%; height: auto; display: block;">
            </div>
        `;
    }

    if (age >= 70) {
        // SCORE2-OP
        if (risk < 7.5) {
            category = "Низький ризик (SCORE2-OP)";
            color = "#2ecc71";
            advice = "Контроль факторів ризику";
        } else if (risk < 15) {
            category = "Помірний ризик (SCORE2-OP)";
            color = "#f1c40f";
            advice = "Спостереження + профілактика";
            onList()
        } else if (risk < 25) {
            category = "Високий ризик (SCORE2-OP)";
            color = "#e67e22";
            advice = "Кардіологічна оцінка";
            onList()
        } else {
            category = "Дуже високий ризик (SCORE2-OP)";
            color = "#e74c3c";
            advice = "Активне лікування факторів ризику";
            onList()
        }
    } else {
        // SCORE2 (40–69)
        if (risk < 2.5) {
            category = "Низький ризик (SCORE2)";
            color = "#2ecc71";
            advice = "Здоровий спосіб життя";
        } else if (risk < 7.5) {
            category = "Помірний ризик (SCORE2)";
            color = "#f1c40f";
            advice = "Контроль тиску і ліпідів";
            onList()
        } else if (risk < 15) {
            category = "Високий ризик (SCORE2)";
            color = "#e67e22";
            advice = "Консультація кардіолога";
            onList()
        } else {
            category = "Дуже високий ризик (SCORE2)";
            color = "#e74c3c";
            advice = "Медикаментозна профілактика + кардіолог";
            onList()
        }
    }

    // =========================
    // 4. OUTPUT (EUROPEAN MEDICAL UI STYLE)
    // =========================

    document.getElementById("result").innerHTML = `
        <div style="font-size:18px;font-weight:bold;margin-bottom:6px;">
            ${category}
        </div>

        <div style="font-size:16px;">
            10-річний ризик: <b>${risk.toFixed(1)}%</b>
        </div>

        <div style="margin-top:8px;font-size:13px;opacity:0.8;">
            Модель: SCORE2 / ESC (клінічна апроксимація)
        </div>

        <style>
        #result:hover {
            filter: drop-shadow(0 0 12px ${color});
        }
        </style>

        <div style="margin-top:10px;padding:8px;border-radius:8px;background:${color};color:white;">

            Рекомендація: ${advice}
        </div>
    `;

    let box = document.getElementById("result");
    box.style.background = "#ffffff";
    box.style.border = "1px solid #eaeaea";
    box.style.borderRadius = "12px";
    box.style.padding = "12px";
}