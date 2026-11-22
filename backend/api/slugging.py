import re
import unicodedata


def unicode_slugify(value):
    value = unicodedata.normalize('NFKC', value).casefold()
    slug_parts = []

    for character in value:
        category = unicodedata.category(character)
        if category[0] in ('L', 'N', 'M'):
            slug_parts.append(character)
        else:
            slug_parts.append('-')

    return re.sub(r'-+', '-', ''.join(slug_parts)).strip('-')
