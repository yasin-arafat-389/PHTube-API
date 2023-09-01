// Fetch data from category API
let fetchCategoryButtons = async () => {
  let categories = [];
  await fetch("https://openapi.programming-hero.com/api/videos/categories/")
    .then((response) => response.json())
    .then((data) => categories.push(data));

  displayCategoryButtons(categories);
};

fetchCategoryButtons();

// Display buttons according to the data fetched from API
let displayCategoryButtons = (category) => {
  let buttonParent = document.getElementById("category-buttons");
  let categories = category[0].data;

  categories.forEach((categoryItem) => {
    let button = document.createElement("button");
    button.textContent = `${categoryItem.category}`;
    button.classList.add(`btn`, "btn-sm", "md:btn-md", "lg:btn-md");
    buttonParent.appendChild(button);

    button.onclick = function () {
      fetchVideoInfo(categoryItem.category_id);
    };
  });
};

// Fetch data from Videos API
let fetchVideoInfo = async (id) => {
  let videos = [];
  await fetch(`https://openapi.programming-hero.com/api/videos/category/${id}`)
    .then((response) => response.json())
    .then((data) => videos.push(data));

  displayVideoInfo(videos);
};

fetchVideoInfo(1000);

// Display Video cards
let displayVideoInfo = (video) => {
  let cardsContainer = document.getElementById("cards-container");
  cardsContainer.textContent = "";
  let videoInfo = video[0].data;

  if (videoInfo.length <= 0) {
    let notFound = document.getElementById("not-found");
    notFound.classList.remove("hidden");
    notFound.innerHTML = `    
    <section class="not-found">
    <div class="nf-container w-[90%] m-auto">
      <img
        class="w-[20%] md:w-[15%] lg:w-[15%] m-auto"
        src="./images/Icon.png"
        alt=""
      />
      <h2
        class="text-center mt-5 font-bold text-[20px] md:text-[20px] lg:text-[32px]"
      >
        Oops!! Sorry, There is no <br />
        content here
      </h2>
    </div>
  </section>`;
  }

  videoInfo.forEach((item) => {
    let card = document.createElement("div");

    card.innerHTML = `
    <div class="card bg-base-100 shadow-xl">
    <figure class="cdx">
      <img src=${item.thumbnail} alt="Shoes" class="rounded-xl h-[170px] w-[100%] " />
    
    </figure>
    <div class="info my-9 flex gap-5 mx-3">
      <img
        class="w-[50px] h-[50px] rounded-full"
        src=${item.authors[0].profile_picture}
        alt=""
      />
      <div class="metadata">
        <p class="font-bold text-[18px] mb-1">
          ${item.title}
        </p>
        <div class="owner-info flex items-center gap-4 mb-2">
          <p>${item.authors[0].profile_name}</p>
          <div></div>

        </div>
        <p>${item.others.views} views</p>
      </div>
    </div>
  </div>
    `;

    if (item.authors[0].verified) {
      let iconElement = document.createElement("i");
      iconElement.className = "fa-solid fa-circle-check";
      iconElement.style.color = "#2568EF";
      card.querySelector(".owner-info div").appendChild(iconElement);
    }

    if (item.others.posted_date) {
      let totalMinutes = item.others.posted_date;
      let hours = Math.floor(totalMinutes / 60);
      let minutes = totalMinutes % 60;
      let time = document.createElement("div");
      time.className =
        "absolute right-5 top-[38%] bg-black text-[#fff] p-2 text-[12px] rounded-lg";
      time.innerHTML = `${hours}hrs ${minutes}mins ago`;
      card.querySelector(".cdx").appendChild(time);
    }

    cardsContainer.appendChild(card);
  });
};
