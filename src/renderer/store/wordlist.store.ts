import dictionaryService from 'renderer/services/dictionany.service';
import { Word } from 'renderer/types/Word.type';
import create from 'zustand';
import { persist } from 'zustand/middleware';

export type WordlistState = {
  words: Word[];
};

const useWordlistStore = create(
  persist(
    (set) => ({
      words: [],
      fetchAndAdd: async (text: string, id: number) => {
        const wordData = await dictionaryService.getDefinition(text);
        console.log(wordData);

        const engDefine =
          wordData?.[0]?.meanings?.[0]?.definitions?.[0]?.definition;
        const newWord: Word = {
          id,
          text,
          engDefine,
        };
        set((state: WordlistState) => ({
          ...state,
          words: [newWord, ...state.words],
        }));
      },
      addWord: (newWord: Word) =>
        set((state: WordlistState) => ({
          ...state,
          words: [newWord, ...state.words],
        })),
      editWord: (wordId: number, wordData: Word) =>
        set((state: WordlistState) => {
          const index = (state.words as Word[])
            .map((word) => word.id)
            .indexOf(wordId);
          const cloneWords = [...state.words];
          cloneWords[index] = wordData;
          return { ...state, words: cloneWords };
        }),
      removeWord: (id: number) =>
        set((state: WordlistState) => ({
          ...state,
          words: state.words.filter((item: Word) => item.id !== id),
        })),
      removeAllWord: () => set({ words: [] }),
    }),
    {
      name: 'words-storage',
    }
  )
);

export default useWordlistStore;
