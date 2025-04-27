
import 'package:a2svhub/core/error/failures.dart';
import 'package:a2svhub/features/contests/domain/entity/contest.dart';
import 'package:a2svhub/features/contests/domain/repository/contest_repository.dart';
import 'package:a2svhub/features/groups/domain/entities/group_entity.dart';
import 'package:a2svhub/features/groups/domain/repository/group_repository.dart';
import 'package:dartz/dartz.dart';

class GetContestsUseCase {
  final ContestRepository contestRepository;
  GetContestsUseCase(this.contestRepository);

  Future<Either<Failure, List<ContestEntity>>> execute() {
    return contestRepository.getcontests();
  }
}
