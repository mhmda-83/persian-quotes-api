enum DefaultState {
  NONE = 'NONE',
}

enum TranslationProgressState {
  TEXT = 'TEXT',
  AUTHOR = 'AUTHOR',
  CATEGORIES = 'CATEGORIES',
}

enum TranslationState {
  VERIFIED = 'VERIFIED',
  DECLINED = 'DECLINED',
}

type BotState = DefaultState | TranslationProgressState | TranslationState;

export { BotState, DefaultState, TranslationProgressState, TranslationState };
