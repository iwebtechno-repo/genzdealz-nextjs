"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { GradientText } from "@/components/ui/gradient-text";
import {
  SparkleIcon,
  MapPinIcon,
  TrendUpIcon,
  UsersIcon,
  ChatCircleIcon,
  HeartIcon,
  DeviceMobileIcon,
  GiftIcon,
  CreditCardIcon,
  BookmarkSimpleIcon,
  DotsThreeIcon,
  PaperPlaneIcon,
} from "@phosphor-icons/react";
import { InstagramIcon } from "@/lib/morphy-ui/morphy";
import { cn } from "@/lib/utils";

const features = [
  {
    icon: SparkleIcon,
    title: "AI Magic",
    description: "Deals that match your vibe, no cap fr fr",
    variant: "gradient" as const,
  },
  {
    icon: MapPinIcon,
    title: "Local Flex",
    description: "Best deals around your campus, periodt",
    variant: "blue" as const,
  },
  {
    icon: TrendUpIcon,
    title: "Student Only",
    description: "Exclusive drops for the college squad",
    variant: "green" as const,
  },
  {
    icon: UsersIcon,
    title: "Squad Goals",
    description: "Share the best finds with your crew",
    variant: "purple" as const,
  },
];

// Mock Instagram API response data
const instagramPosts = [
  {
    id: "17841400008772848",
    username: "genzdealz_official",
    profile_picture: "https://picsum.photos/seed/profile1/40/40",
    verified: true,
    media_type: "IMAGE",
    media_url: "https://picsum.photos/seed/post1/600/600",
    caption:
      "New semester, new deals! 🎓✨ Get up to 50% off on tech essentials. Link in bio!\n\n#StudentDeals #GenZ #BackToSchool #StudentDiscounts #TechDeals",
    like_count: 4892,
    comment_count: 234,
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    comments: [
      { username: "student_life24", text: "Just copped the iPad deal! 🔥" },
      { username: "tech_guru_z", text: "This is why I love this app!" },
    ],
    location: "Mumbai, India",
  },
  {
    id: "17841400008772849",
    username: "campus_foodie",
    profile_picture: "https://picsum.photos/seed/profile2/40/40",
    verified: false,
    media_type: "CAROUSEL_ALBUM",
    media_url: "https://picsum.photos/seed/post2/600/600",
    carousel_media: [
      "https://picsum.photos/seed/carousel1/600/600",
      "https://picsum.photos/seed/carousel2/600/600",
      "https://picsum.photos/seed/carousel3/600/600",
    ],
    caption:
      "Found these amazing food deals on @genzdealz_official! 🍕🍔 Swipe to see all the restaurants offering student discounts near campus →\n\n#FoodDeals #StudentLife #CampusEats",
    like_count: 1247,
    comment_count: 89,
    timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
    comments: [
      {
        username: "hungry_scholar",
        text: "Ordering rn! Thanks for sharing 🙏",
      },
    ],
    location: "Delhi University",
  },
  {
    id: "17841400008772850",
    username: "study_smart_2024",
    profile_picture: "https://picsum.photos/seed/profile3/40/40",
    verified: false,
    media_type: "IMAGE",
    media_url: "https://picsum.photos/seed/post3/600/600",
    caption:
      "Game changer alert! 🚨 Just discovered GenZGPT can help with assignments AND find deals. Two birds, one stone! 🎯\n\n@genzdealz_official you guys are killing it!\n\n#StudyHacks #GenZGPT #StudentTools",
    like_count: 892,
    comment_count: 56,
    timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
    comments: [
      { username: "code_ninja", text: "Wait, it helps with coding too? 😱" },
      { username: "genzdealz_official", text: "💜 Glad you're loving it!" },
    ],
    location: "IIT Bombay",
  },
  {
    id: "17841400008772851",
    username: "fashion_on_budget",
    profile_picture: "https://picsum.photos/seed/profile4/40/40",
    verified: false,
    media_type: "VIDEO",
    media_url: "https://picsum.photos/seed/post4/600/600",
    video_thumbnail: "https://picsum.photos/seed/video4/600/600",
    caption:
      "POV: You're a broke college student but still wanna look cute 💅✨\n\nThank me later for this hack! All these brands on @genzdealz_official have exclusive student prices 🛍️\n\n#FashionDeals #StudentFashion #BudgetFashion",
    like_count: 3421,
    comment_count: 178,
    timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
    comments: [
      { username: "style_on_dime", text: "Literally saved my wardrobe!" },
    ],
    is_video: true,
  },
];

// Add static profile meta (replace with dynamic fetch later if desired)
const instagramProfile = {
  username: "genzdealz.ai",
  profilePicture: "https://picsum.photos/seed/genzprofile/40/40",
  followers: 1870,
  posts: 24,
  verified: true,
};

const HomePage = () => {
  const [likedPosts, setLikedPosts] = useState<Set<string>>(new Set());
  const [savedPosts, setSavedPosts] = useState<Set<string>>(new Set());
  const [carouselIndex] = useState<{ [key: string]: number }>({});

  const handleLike = (postId: string) => {
    setLikedPosts((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(postId)) {
        newSet.delete(postId);
      } else {
        newSet.add(postId);
      }
      return newSet;
    });
  };

  const handleSave = (postId: string) => {
    setSavedPosts((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(postId)) {
        newSet.delete(postId);
      } else {
        newSet.add(postId);
      }
      return newSet;
    });
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));

    if (hours < 1) {
      const minutes = Math.floor(diff / (1000 * 60));
      return `${minutes}m`;
    } else if (hours < 24) {
      return `${hours}h`;
    } else {
      const days = Math.floor(hours / 24);
      return `${days}d`;
    }
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + "M";
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + "K";
    }
    return num.toString();
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 to-background/20 backdrop-blur-sm" />
        <div className="container relative z-10 px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Hero Content */}
            <div className="flex flex-col items-start text-left space-y-8">
              <div className="max-w-2xl">
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6">
                  <GradientText
                    variant="gradient"
                    className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl"
                  >
                    GenZDealZ.ai
                  </GradientText>
                </h1>
                <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground font-medium mb-6 sm:mb-8">
                  Your AI-powered shopping journey begins here.
                  <br />
                  <GradientText variant="gradient">
                    No cap, just vibes.
                  </GradientText>
                </p>
                <div className="space-y-4 mb-8">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center">
                      <SparkleIcon
                        className="h-4 w-4 text-white"
                        weight="duotone"
                      />
                    </div>
                    <span className="text-lg">AI-powered deal discovery</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-green-500 to-green-600 flex items-center justify-center">
                      <MapPinIcon
                        className="h-4 w-4 text-white"
                        weight="duotone"
                      />
                    </div>
                    <span className="text-lg">Local campus deals</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-purple-600 flex items-center justify-center">
                      <UsersIcon
                        className="h-4 w-4 text-white"
                        weight="duotone"
                      />
                    </div>
                    <span className="text-lg">Student community</span>
                  </div>
                </div>
                <Link href="/genzgpt">
                  <Button variant="gradient" effect="fill" size="lg" showRipple>
                    Ask GenZGPT
                  </Button>
                </Link>
              </div>
            </div>

            {/* Instagram Feed */}
            <div className="relative">
              <Card
                variant="none"
                effect="glass"
                className="p-0 overflow-hidden"
                showRipple={false}
              >
                {/* Instagram Header */}
                <div className="flex items-center justify-between p-4 border-b border-border/50">
                  <div className="flex items-center gap-3">
                    <img
                      src={instagramProfile.profilePicture}
                      alt={instagramProfile.username}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <div className="flex items-center gap-1">
                      <span className="font-semibold text-sm">
                        @{instagramProfile.username}
                      </span>
                      {instagramProfile.verified && (
                        <svg
                          className="w-3 h-3 text-blue-500"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                        >
                          <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                        </svg>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-xs sm:text-sm text-muted-foreground">
                    <span>
                      <span className="font-semibold text-foreground">
                        {formatNumber(instagramProfile.followers)}
                      </span>{" "}
                      followers
                    </span>
                    <span>
                      <span className="font-semibold text-foreground">
                        {instagramProfile.posts}
                      </span>{" "}
                      posts
                    </span>
                  </div>
                </div>

                {/* Instagram Posts */}
                <div className="max-h-[450px] overflow-y-auto">
                  {instagramPosts.map((post) => (
                    <div
                      key={post.id}
                      className="border-b border-border/50 last:border-b-0"
                    >
                      {/* Post Header */}
                      <div className="flex items-center justify-between p-3">
                        <div className="flex items-center gap-3">
                          <img
                            src={post.profile_picture}
                            alt={post.username}
                            className="w-8 h-8 rounded-full object-cover"
                          />
                          <div>
                            <div className="flex items-center gap-1">
                              <span className="font-semibold text-sm">
                                {post.username}
                              </span>
                              {post.verified && (
                                <svg
                                  className="w-3 h-3 text-blue-500"
                                  viewBox="0 0 24 24"
                                  fill="currentColor"
                                >
                                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                                </svg>
                              )}
                            </div>
                            {post.location && (
                              <span className="text-xs text-muted-foreground">
                                {post.location}
                              </span>
                            )}
                          </div>
                        </div>
                        <Button variant="link" size="icon" className="h-8 w-8">
                          <DotsThreeIcon className="h-5 w-5" />
                        </Button>
                      </div>

                      {/* Post Media */}
                      <div className="relative aspect-square bg-muted">
                        {post.media_type === "CAROUSEL_ALBUM" ? (
                          <div className="relative w-full h-full">
                            <img
                              src={
                                post.carousel_media?.[
                                  carouselIndex[post.id] || 0
                                ] || post.media_url
                              }
                              alt="Post"
                              className="w-full h-full object-cover"
                            />
                            {/* Carousel Indicators */}
                            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-1">
                              {post.carousel_media?.map((_, idx) => (
                                <div
                                  key={idx}
                                  className={cn(
                                    "w-1.5 h-1.5 rounded-full transition-all",
                                    (carouselIndex[post.id] || 0) === idx
                                      ? "bg-white w-2"
                                      : "bg-white/60"
                                  )}
                                />
                              ))}
                            </div>
                          </div>
                        ) : post.is_video ? (
                          <div className="relative w-full h-full">
                            <img
                              src={post.video_thumbnail || post.media_url}
                              alt="Video thumbnail"
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 flex items-center justify-center">
                              <div className="w-16 h-16 bg-black/50 rounded-full flex items-center justify-center">
                                <svg
                                  className="w-8 h-8 text-white ml-1"
                                  viewBox="0 0 24 24"
                                  fill="currentColor"
                                >
                                  <path d="M8 5v14l11-7z" />
                                </svg>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <img
                            src={post.media_url}
                            alt="Post"
                            className="w-full h-full object-cover"
                            onDoubleClick={() => handleLike(post.id)}
                          />
                        )}
                      </div>

                      {/* Post Actions */}
                      <div className="p-3">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-4">
                            <Button
                              variant="link"
                              size="icon"
                              className="h-6 w-6 p-0"
                              onClick={() => handleLike(post.id)}
                            >
                              <HeartIcon
                                className={cn(
                                  "h-6 w-6",
                                  likedPosts.has(post.id) &&
                                    "fill-red-500 text-red-500"
                                )}
                                weight={
                                  likedPosts.has(post.id) ? "fill" : "regular"
                                }
                              />
                            </Button>
                            <Button
                              variant="link"
                              size="icon"
                              className="h-6 w-6 p-0"
                            >
                              <ChatCircleIcon className="h-6 w-6" />
                            </Button>
                            <Button
                              variant="link"
                              size="icon"
                              className="h-6 w-6 p-0"
                            >
                              <PaperPlaneIcon className="h-6 w-6" />
                            </Button>
                          </div>
                          <Button
                            variant="link"
                            size="icon"
                            className="h-6 w-6 p-0"
                            onClick={() => handleSave(post.id)}
                          >
                            <BookmarkSimpleIcon
                              className={cn(
                                "h-6 w-6",
                                savedPosts.has(post.id) && "fill-current"
                              )}
                              weight={
                                savedPosts.has(post.id) ? "fill" : "regular"
                              }
                            />
                          </Button>
                        </div>

                        {/* Likes */}
                        <div className="font-semibold text-sm mb-2">
                          {formatNumber(
                            post.like_count + (likedPosts.has(post.id) ? 1 : 0)
                          )}{" "}
                          likes
                        </div>

                        {/* Caption */}
                        <div className="text-sm mb-2">
                          <span className="font-semibold mr-2">
                            {post.username}
                          </span>
                          <span className="whitespace-pre-wrap">
                            {post.caption}
                          </span>
                        </div>

                        {/* Comments Preview */}
                        {post.comment_count > 0 && (
                          <button className="text-sm text-muted-foreground mb-2">
                            View all {post.comment_count} comments
                          </button>
                        )}
                        {post.comments?.slice(0, 2).map((comment, idx) => (
                          <div key={idx} className="text-sm mb-1">
                            <span className="font-semibold mr-2">
                              {comment.username}
                            </span>
                            <span>{comment.text}</span>
                          </div>
                        ))}

                        {/* Timestamp */}
                        <div className="text-xs text-muted-foreground uppercase">
                          {formatTimestamp(post.timestamp)} ago
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Instagram Footer */}
                <div className="p-4 border-t border-border">
                  <Button
                    variant="none"
                    effect="glass"
                    size="sm"
                    showRipple
                    className="w-full"
                    icon={{ icon: InstagramIcon }}
                  >
                    Follow @genzdealz_official
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-background/50">
        <div className="container px-4 mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <GradientText variant="gradient">
                Why We&apos;re Different
              </GradientText>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              We&apos;re not your average shopping app. We&apos;re built
              different.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature) => (
              <div key={feature.title}>
                <Card
                  variant={feature.variant}
                  effect="glass"
                  className="h-full rounded-2xl"
                  showRipple
                  icon={{
                    icon: feature.icon,
                    title: feature.title,
                  }}
                >
                  <div className="space-y-4">
                    <h3 className="text-2xl font-bold">
                      <GradientText variant="gradient">
                        {feature.title}
                      </GradientText>
                    </h3>
                    <p className="text-lg text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Access Section */}
      <section className="py-20 bg-muted/30">
        <div className="container px-4 mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <GradientText variant="gradient">Get Started Today</GradientText>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Explore what GenZ loves most. From AI assistance to exclusive
              deals.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            <Link href="/genzgpt">
              <Card
                variant="gradient"
                effect="glass"
                className="h-full"
                showRipple
                icon={{
                  icon: DeviceMobileIcon,
                  title: "GenZ GPT",
                  subtitle: "AI Assistant",
                }}
              >
                <div className="text-center space-y-2">
                  <h3 className="text-xl font-bold text-white">GenZ GPT</h3>
                  <p className="text-purple-100">Your AI study buddy</p>
                </div>
              </Card>
            </Link>

            <Link href="/recharge">
              <Card
                variant="blue"
                effect="glass"
                className="h-full"
                showRipple
                icon={{
                  icon: CreditCardIcon,
                  title: "Recharge & Bills",
                  subtitle: "Easy payments",
                }}
              >
                <div className="text-center space-y-2">
                  <h3 className="text-xl font-bold text-white">
                    Recharge & Bills
                  </h3>
                  <p className="text-blue-100">Mobile, DTH & more</p>
                </div>
              </Card>
            </Link>

            <Link href="/giftcards">
              <Card
                variant="green"
                effect="glass"
                className="h-full"
                showRipple
                icon={{
                  icon: GiftIcon,
                  title: "Gift Cards",
                  subtitle: "Perfect gifts",
                }}
              >
                <div className="text-center space-y-2">
                  <h3 className="text-xl font-bold text-white">Gift Cards</h3>
                  <p className="text-green-100">Cashback guaranteed</p>
                </div>
              </Card>
            </Link>

            <Link href="/shared-subscriptions">
              <Card
                variant="orange"
                effect="glass"
                className="h-full"
                showRipple
                icon={{
                  icon: UsersIcon,
                  title: "Shared Subscriptions",
                  subtitle: "Save together",
                }}
              >
                <div className="text-center space-y-2">
                  <h3 className="text-xl font-bold text-white">Shared Subs</h3>
                  <p className="text-orange-100">Split & save up to 70%</p>
                </div>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-background">
        <div className="container px-4 mx-auto text-center">
          <div className="max-w-3xl mx-auto space-y-8">
            <h2 className="text-4xl md:text-6xl font-bold">
              <GradientText variant="gradient">Ready to Level Up?</GradientText>
            </h2>
            <p className="text-xl md:text-2xl text-muted-foreground">
              Join thousands of students already winning with GenZDealZ.ai
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/login">
                <Button
                  variant="gradient"
                  effect="fill"
                  size="xl"
                  showRipple
                  icon={{ icon: SparkleIcon }}
                >
                  Get Started Free
                </Button>
              </Link>
              <Link href="/personalized">
                <Button
                  variant="blue"
                  effect="glass"
                  size="xl"
                  showRipple
                  icon={{ icon: TrendUpIcon }}
                >
                  See Personalized Deals
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
