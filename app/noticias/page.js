import NewsHeroSlider from "@/components/NewsHeroSlider";

export default function ExtensaoPage() {

  return (
    <main>
      <section className="container extensao">
        <h1>Noticias</h1>
        <NewsHeroSlider />
        <section className="section home-news-section" aria-labelledby="noticias-title">
          <div className="news-panel">
            <div className="section-head">
              <iframe
                className="news-iframe"
                src="https://widgets.sociablekit.com/linkedin-profile-posts/iframe/25706836"
                frameBorder="0"
                width="100%"
                height="1500px"
              ></iframe>
            </div>
          </div>
        </section>
      </section >
    </main >
  );
}


