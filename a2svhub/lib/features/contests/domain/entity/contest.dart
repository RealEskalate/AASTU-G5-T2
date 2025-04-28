class ContestEntity {
  final int id;
  final String name;
  final String link;
  final int problemCount;
  final DateTime createdAt;
  final DateTime updatedAt;
  final bool unrated;
  final String type;

  const ContestEntity({
    required this.id,
    required this.name,
    required this.link,
    required this.problemCount,
    required this.createdAt,
    required this.updatedAt,
    required this.unrated,
    required this.type,
  });
}
