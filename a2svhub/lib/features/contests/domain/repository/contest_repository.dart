

import 'package:a2svhub/core/error/failures.dart';
import 'package:a2svhub/features/contests/domain/entity/contest.dart';
import 'package:a2svhub/features/groups/domain/entities/group_entity.dart';
import 'package:dartz/dartz.dart';

abstract class ContestRepository {
  Future<Either<Failure, ContestEntity>> getcontest(int id);
  
  Future<Either<Failure, List<ContestEntity>>> getcontests();
}
