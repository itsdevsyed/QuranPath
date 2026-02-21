import React from 'react';
import { Text } from 'react-native';
import AyahText from './AyahText';

interface AyahListProps {
  verses: { id: number; text: string; ayah_no: number }[];
}

const AyahList: React.FC<AyahListProps> = ({ verses }) => {
  return (
    <Text style={{ writingDirection: 'rtl', textAlign: 'justify' }}>
      {verses.map((ayah) => (
        <AyahText
          key={ayah.id}
          text={ayah.text}
          ayahNumber={ayah.ayah_no}
        />
      ))}
    </Text>
  );
};

export default AyahList;
