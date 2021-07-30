nums1 = [1, 2, 3, 4, 5];
nums2 = [6, 7, 8, 9, 10];

nums3 = [1, 3, 5, 7, 9];
nums4 = [10, 8, 6, 4, 2];

nums5 = [1, 3, 5, 7, 9, 11, 12];
nums6 = [1, 2, 3, 4, 5, 10, 12];

function mergeArrays(arr1, arr2) {
    // let set = new Set(arr1.concat(arr2));
    return [...new Set(arr1.concat(arr2))].sort((a, b) => a > b ? 1 : b > a ? -1 : 0);
}

console.log(mergeArrays(nums1, nums2));

console.log(mergeArrays(nums3, nums4));

console.log(mergeArrays(nums5, nums6));
