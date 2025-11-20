// aboutPage.tsx
import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

type FAQItem = {
  question: string;
  answer: string;
};

const faqs: FAQItem[] = [
  { question: 'How do I add a new clothing item?', answer: 'Go to Add Clothes, select a category and upload a photo.' },
  { question: 'Can I remove outfits from my wardrobe?', answer: 'Yes, swipe left on the item in your wardrobe to delete it.' },
  { question: 'How does Outfitly recommend outfits?', answer: 'Outfitly uses AI algorithms considering your style preferences and weather.' },
];

export default function AboutPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Help & About</Text>

      {/* About Section */}
      <View style={styles.card}>
        <MaterialCommunityIcons name="information-outline" size={28} color="#4b7bec" />
        <Text style={styles.cardText}>
          Outfitly is your personal wardrobe assistant. Track your outfits, get AI recommendations, and manage your wardrobe easily.
        </Text>
      </View>

      {/* FAQ Section */}
      <View style={styles.card}>
        <Ionicons name="help-circle-outline" size={28} color="#fd9644" />
        <Text style={styles.cardText}>Frequently Asked Questions:</Text>
        {faqs.map((faq, index) => (
          <View key={index}>
            <TouchableOpacity onPress={() => toggleFAQ(index)} style={styles.faqQuestion}>
              <Text style={styles.faqQuestionText}>{faq.question}</Text>
              <Ionicons
                name={openIndex === index ? 'chevron-up' : 'chevron-down'}
                size={20}
                color="#333"
              />
            </TouchableOpacity>
            {openIndex === index && (
              <Text style={styles.faqAnswer}>{faq.answer}</Text>
            )}
          </View>
        ))}
      </View>

      {/* Contact Section */}
      <View style={styles.card}>
        <Ionicons name="mail-outline" size={28} color="#ff2e84" />
        <Text style={styles.cardText}>
          For support or feedback, email us at{' '}
          <Text style={styles.link} onPress={() => Linking.openURL('mailto:support@outfitly.com')}>
            support@outfitly.com
          </Text>
        </Text>
      </View>

      {/* App Version */}
      <View style={styles.card}>
       <MaterialCommunityIcons name="cellphone" size={28} color="#20bf6b" />
        <Text style={styles.cardText}>Version: 1.0.0</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#f9f9f9',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  card: {
    width: '100%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  cardText: {
    marginLeft: 0,
    fontSize: 16,
    color: '#333',
    marginTop: 10,
  },
  link: {
    color: '#ff2e84',
    textDecorationLine: 'underline',
  },
  faqQuestion: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    paddingVertical: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: '#ccc',
  },
  faqQuestionText: {
    fontSize: 16,
    fontWeight: '600',
  },
  faqAnswer: {
    marginTop: 5,
    marginBottom: 10,
    fontSize: 15,
    color: '#555',
  },
});
