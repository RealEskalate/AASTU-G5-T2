import 'package:a2svhub/features/contests/domain/entity/contest.dart';

class ContestModel extends ContestEntity {
  const ContestModel({
    required int id,
    required String name,
    required String link,
    required int problemCount,
    required DateTime createdAt,
    required DateTime updatedAt,
    required bool unrated,
    required String type,
  }) : super(
          id: id,
          name: name,
          link: link,
          problemCount: problemCount,
          createdAt: createdAt,
          updatedAt: updatedAt,
          unrated: unrated,
          type: type,
        );

  factory ContestModel.fromJson(Map<String, dynamic> json) {
    return ContestModel(
      id: json['id'],
      name: json['name'],
      link: json['link'],
      problemCount: json['problem_count'],
      createdAt: DateTime.parse(json['created_at']),
      updatedAt: DateTime.parse(json['updated_at']),
      unrated: json['unrated'],
      type: json['type'],
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'name': name,
      'link': link,
      'problem_count': problemCount,
      'created_at': createdAt.toIso8601String(),
      'updated_at': updatedAt.toIso8601String(),
      'unrated': unrated,
      'type': type,
    };
  }

  // 🔥 Add fromEntity
  factory ContestModel.fromEntity(ContestEntity entity) {
    return ContestModel(
      id: entity.id,
      name: entity.name,
      link: entity.link,
      problemCount: entity.problemCount,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
      unrated: entity.unrated,
      type: entity.type,
    );
  }

  // 🔥 Add toEntity
  ContestEntity toEntity() {
    return ContestEntity(
      id: id,
      name: name,
      link: link,
      problemCount: problemCount,
      createdAt: createdAt,
      updatedAt: updatedAt,
      unrated: unrated,
      type: type,
    );
  }
}
