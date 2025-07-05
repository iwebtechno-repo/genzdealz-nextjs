"use client";

import React from "react";
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
  ShareIcon,
  DeviceMobileIcon,
  GiftIcon,
  CreditCardIcon,
} from "@phosphor-icons/react";
import { InstagramIcon } from "@/lib/morphy-ui/morphy";
import { getVariantGradient } from "@/lib/morphy-ui/utils";

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

const HomePage = () => {
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
                    <div
                      className={`w-8 h-8 rounded-full bg-gradient-to-r ${getVariantGradient(
                        "blue"
                      )} flex items-center justify-center`}
                    >
                      <SparkleIcon
                        className="h-4 w-4 text-white"
                        weight="duotone"
                      />
                    </div>
                    <span className="text-lg">AI-powered deal discovery</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-8 h-8 rounded-full bg-gradient-to-r ${getVariantGradient(
                        "green"
                      )} flex items-center justify-center`}
                    >
                      <MapPinIcon
                        className="h-4 w-4 text-white"
                        weight="duotone"
                      />
                    </div>
                    <span className="text-lg">Local campus deals</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-8 h-8 rounded-full bg-gradient-to-r ${getVariantGradient(
                        "purple"
                      )} flex items-center justify-center`}
                    >
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

            {/* Community Feed */}
            <div className="relative">
              <Card
                variant="none"
                showRipple={false}
                icon={{
                  icon: InstagramIcon,
                  title: "Instagram Feed",
                  subtitle: "Real student experiences",
                }}
              >
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {[
                    {
                      username: "genzdealz_official",
                      avatar: "👨‍💻",
                      content:
                        "Just dropped our latest student deals! 🎓✨ Check out exclusive discounts on courses, gadgets, and more. #StudentLife #Deals #GenZ",
                      likes: 1247,
                      time: "2h ago",
                    },
                    {
                      username: "tech_savvy_student",
                      avatar: "🎓",
                      content:
                        "Thanks @genzdealz_official for the amazing laptop deal! Saved me $300 on my new MacBook. Best student platform ever! 💻🙏",
                      likes: 892,
                      time: "4h ago",
                    },
                    {
                      username: "college_life_2024",
                      avatar: "📚",
                      content:
                        "Just discovered this awesome AI assistant that helps with everything from homework to finding the best deals. Game changer! 🤖✨",
                      likes: 567,
                      time: "6h ago",
                    },
                    {
                      username: "budget_student",
                      avatar: "💰",
                      content:
                        "Pro tip: Always check @genzdealz_official before making any big purchases. You'll be surprised how much you can save! 💡",
                      likes: 445,
                      time: "8h ago",
                    },
                  ].map((post, index) => (
                    <div
                      key={index}
                      className="border-b border-border/50 pb-4 last:border-b-0"
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-sm">
                          {post.avatar}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-semibold text-sm">
                              @{post.username}
                            </span>
                            <span className="text-xs text-muted-foreground">
                              •
                            </span>
                            <span className="text-xs text-muted-foreground">
                              {post.time}
                            </span>
                          </div>
                          <p className="text-sm text-foreground mb-2 leading-relaxed">
                            {post.content}
                          </p>
                          <div className="flex items-center gap-4 text-xs text-muted-foreground">
                            <Button
                              variant="none"
                              effect="glass"
                              size="sm"
                              showRipple
                              icon={{ icon: HeartIcon }}
                            >
                              <span>{post.likes}</span>
                            </Button>
                            <Button
                              variant="none"
                              effect="glass"
                              size="sm"
                              showRipple
                              icon={{ icon: ChatCircleIcon }}
                            >
                              <span>Comment</span>
                            </Button>
                            <Button
                              variant="none"
                              effect="glass"
                              size="sm"
                              showRipple
                              icon={{ icon: ShareIcon }}
                            >
                              <span>Share</span>
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 pt-4 border-t border-border">
                  <Button
                    variant="none"
                    effect="glass"
                    size="sm"
                    showRipple
                    className="w-full"
                    icon={{ icon: InstagramIcon }}
                  >
                    Follow on Instagram
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
