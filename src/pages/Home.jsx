import React from 'react';
import HomeBanner from '../components/HomeBanner';
import FeaturedCategories from '../components/FeaturedCategories';
import ReadingTips from '../components/ReadingTips';
import CommunityShoutouts from '../components/CommunityShoutouts';
import PopularBooks from '../components/PopularBooks';
import HomeBannerSlider from '../components/HomeBannerSlider';

const Home = () => {
  document.title = "Virtual Bookshelf - Home";
  return (
    <div>

      <HomeBannerSlider></HomeBannerSlider>
      <HomeBanner></HomeBanner>
      <PopularBooks></PopularBooks>
      <FeaturedCategories></FeaturedCategories>
      <ReadingTips></ReadingTips>
      <CommunityShoutouts></CommunityShoutouts>
    </div>
  );
};

export default Home;