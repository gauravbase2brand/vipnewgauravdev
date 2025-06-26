"use client"
import React from 'react'
import Familypackbanner from './Familypackbanner'
import Familypacksearch from './Familypacksearch'
import Familycardcom from './Familycardcom'
import Fpsider from './Fpsider'
import Fpcard from './Fpcard'
import Fppara from './Fppara'
import Fpbusbarcom from './Fpbusbarcom'
import Fptrustvideo from './Fptrustvideo'
import NumerologyReview from '../numerology/NumerologyReview'
import NumerlogyArticlesBlog from '../numerology/NumerlogyArticlesBlog'
import Familypackclientreview from './Familypackclientreview'
import NumerologyFaq from '../numerology/NumerologyFaq'
import AwardWinner from '../Shared/AwardWinner/AwardWinner/AwardWinner'
import NumerologyFeatures from '../numerology/NumerologyFeatures'

function Familypackpage() {
  const faqdata = [
    // 1
    {
      question: "What’s included in the Family Pack?",
      answer:
        "The Family Pack includes a selection of VIP mobile numbers for your family. Choose from packs of 2, 3, or 4 numbers to keep your loved ones connected in a unique way.",
    },
    // 2
    {
      question: "How can the Family Pack benefit me?",
      answer:
        "The Family Pack offers a personalized, easy-to-remember number for each family member, making communication smoother and more special.",
    },
    // 3
    {
      question: "Can I customize the numbers in the Family Pack?",
      answer:
        "Yes! You can personalize your Family Pack numbers to match your preferences, including special requests like matching them with your house number.",
    },
    // 4
    {
      question: "What’s included in the Business Pack?",
      answer:
        "The Business Pack includes VIP mobile numbers tailored for your business needs. Choose from packs of 5, 6, or 7 numbers to help manage your business communication more effectively.",
    },
    // 5
    {
      question: "How can the Business Pack help my business?",
      answer:
        " The Business Pack provides your team with unique, easy-to-remember numbers that can help enhance your professional image and make your business stand out.",
    },
    // 6
    {
      question: "Can I get a Business Pack with more than 7 numbers?",
      answer:
        " For larger teams or businesses with more specific needs, we offer custom Business Packs. Feel free to contact us, and we’ll create a pack that works for you.",
    },
    // 7
    {
      question: "Are the Family and Business Packs available in all areas?",
      answer:
        " Yes, both the Family and Business Packs are available in various regions. Check the availability in your area directly on our website",
    },
    // 8
    {
      question: "Can I upgrade from a Family Pack to a Business Pack?",
      answer:
        "Yes, you can upgrade your Family Pack to a Business Pack by selecting the desired option from our offerings. Contact us if you need assistance with the transition.",
    },
    // 9
    {
      question: "Can I combine both Family and Business Packs?",
      answer:
        " Yes, you can purchase both Family and Business Packs if you need unique numbers for your family and business needs. Each pack is sold separately based on your requirements.",
    },
    // 10
    {
      question: "How do I purchase a Family or Business Pack?",
      answer:
        "Simply choose the pack that best suits your needs on our website, and follow the easy checkout process to complete your purchase.",
    },
  ]
  return (
    <div className='family_pack_page'>
      <Familypackbanner />
      <Familypacksearch />
      <Familycardcom />
      <Fpsider />
      <Fpcard />
      <Fppara />
      <Fpbusbarcom />
      <Fptrustvideo />
      <NumerologyReview />
      <Familypackclientreview />
      <NumerlogyArticlesBlog />
      <NumerologyFaq data={faqdata} faqs_description="To get the best VIP numbers for a lifetime, you must first clear any doubts you may have, if any" />
      <AwardWinner />
      <NumerologyFeatures />
      <style jsx>{`
        @media screen and (max-width:1024px) {
          .family_pack_page :global(br) {
           display: none !important;
         }
        }
      `}</style>
    </div>
  )
}
export default Familypackpage
