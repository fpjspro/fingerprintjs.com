import React from "react";
import Layout from "../../components/Layout";
import PriceCalculator from "../../components/PriceCalculator";
import Section from "../../components/base/Section";
import styles from "./Pricing.module.scss";
import classNames from "classnames";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  description?: string;
  invertOrder?: boolean;
}

function SectionHeader({
  title,
  subtitle,
  description,
  invertOrder = false,
}: SectionHeaderProps) {
  return (
    <header className={classNames(styles.sectionHeader, { [styles.sectionInverted]: invertOrder})}>
      <p className={styles.sectionSubtitle}>{subtitle}</p>
      <h2 className={styles.sectionTitle}>{title}</h2>
      <p className={styles.sectionDescription}>{description}</p>
    </header>
  );
}


interface PricingCardProps {
  title: string,
  description: string,
  sectionClasses: string | string[],
  children: React.ReactNode,
}

function PricingCard ({
  title,
  description,
  sectionClasses,
  children
}: PricingCardProps) {
  return (
    <section className={classNames(styles.pricingCard, sectionClasses)}>
      <aside>
        <header>
          <h3 className={styles.cardTitle}>{title}</h3>
          <p className={styles.cardDescription}>{description}</p>
        </header>
      </aside>
      <div className={styles.cardContent}>
        {children}
      </div>
    </section>
  );
}

function CalculatorSection() {
  return (
    <Section classes={styles.pricingSection}>
      <SectionHeader
        title={"Pro Pricing"}
        subtitle={"Calculator"}
        description={`If you don't know how many identifications you need, use monthly user sessions`}
      />
      <PriceCalculator />
    </Section>
  );
}

function PricingModelsSection() {
  return (
    <Section classes={styles.pricingSection}>
      <SectionHeader
        title={"Pricing Models"}
        subtitle={"We support 2 models of pricing"}
        invertOrder
      />
      <PricingCard
        title={"On-\nDemand"}
        description={
          "For on-demand pricing, you pay monthly per API call. This plan is recommended for users with unpredictable or low traffic volumes."
        }
        sectionClasses={styles.pricingCardOnDemand}
      >
        <ul className={styles.arrowList}>
          <li>
            On-demand is a metered model, where we count your API calls and bill you accordingly
            every month.
          </li>
          <li>
            The on-demand plan is recommended when you have a small and/or unpredictable volume
            and want to pay only for what you use every month. You can cancel at any time.
          </li>
          <li>
            The minimum plan is $100/month, which includes 100,000 identifications per month.
            Unused API calls are not carried over to the next month.
          </li>
        </ul>
        <div className={styles.priceTable}>
          <div className={classNames(styles.row, styles.header)}>
            <div className={styles.column}>Monthly API Call</div>
            <div className={styles.column}>Price</div>
          </div>
          <div className={styles.row}>
            <div className={styles.column}>0 - 100K</div>
            <div className={styles.column}>Flat fee of $100/month</div>
          </div>
          <div className={styles.row}>
            <div className={styles.column}>&gt; 100K</div>
            <div className={styles.column}>$1 per 1,000 API calls</div>
          </div>
        </div>
      </PricingCard>
      <PricingCard
        title={"Reserved"}
        description={
          "Reserved is a 1 year prepaid plan that has several advantages compared to the on-demand model."
        }
        sectionClasses={styles.pricingCardReserved}
      >
        <ul className={classNames(styles.numberList, styles.horizontal)}>
          <li>You lock in your price for 1 year and get a 20% discount.</li>
          <li>Unused API calls are carried over from month to month</li>
        </ul>
        <div className={styles.quote}>
          A reserved plan is recommended when you have a high and/or predictable volume and
          getting a significant discount for your usage is important.
        </div>
      </PricingCard>
    </Section>
  );
}

export default function PricingPage() {
  return (
    <Layout>
      <CalculatorSection/>
      <PricingModelsSection/>      
    </Layout>
  );
}
