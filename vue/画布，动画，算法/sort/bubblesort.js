var arr = [2,4,9,6,7,3]

/*  冒泡排序
1.比较相邻的两个元素，如果前一个比后一个大，则交换位置。

2.第一轮的时候最后一个元素应该是最大的一个。

　　　3.按照步骤一的方法进行相邻两个元素的比较，这个时候由于最后一个元素已经是最大的了，所以最后一个元素不用比较。*/
function bubblesort(arr){
    var len = arr.length;
    for(var i = 0;i<len-1;i++){
        for(var j=0;j<len-i-1;j++){
            if(arr[j] > arr[j+1]){
                var swap = arr[j+1];
                arr[j+1] = arr[j];
                arr[j] = swap;
            }
        }
    }
    return arr;
}
console.log(bubblesort(arr));

//递归
function plus(num){
    if(num == 1){
        return 1;
    };
    return num * plus(num - 1)
}
console.log(plus(5));

/*  快速排序
* 2.解析：快速排序是对冒泡排序的一种改进，第一趟排序时将数据分成两部分，一部分比另一部分的所有数据都要小。然后递归调用，在两边都实行快速排序。
* */
function quicksort(arr){
    if(arr.length <=1){
        return arr;
    }
    var pivotIndex = Math.floor(arr.length / 2);
    var pivot = arr.splice(pivotIndex,1)[0];
    var left = [];
    var right = [];
    for(var i = 0;i<arr.length;i++){
        if(arr[i] < pivot){
            left.push(arr[i]);
        }else {
            right.push(arr[i]);
        }
    }
    return quicksort(left).concat(pivot,quicksort(right));
};
// console.log(quicksort(arr));

/*
* 3.插入排序:

解析：

 （1） 从第一个元素开始，该元素可以认为已经被排序

 （2） 取出下一个元素，在已经排序的元素序列中从后向前扫描

 （3） 如果该元素（已排序）大于新元素，将该元素移到下一位置

 （4） 重复步骤3，直到找到已排序的元素小于或者等于新元素的位置

 （5）将新元素插入到下一位置中

 （6） 重复步骤2
* */
function insertsort(arr){
    for(var i =1;i<arr.length;i++){
        if(arr[i] < arr[i - 1]){
            var guard = arr[i];
            var j = i - 1;
            arr[i] = arr[j];
            while(j>=0 && guard<arr[j]){
                arr[j + 1] = arr[j];
                j--;
            };
            arr[j + 1 ] = guard;
        }
    }
    return arr;
}
console.log(insertsort(arr));

/*4. 选择排序
     选择排序(Selection-sort)是一种简单直观的排序算法。它的工作原理：首先在未排序序列中找到最小（大）元素，存放到排序序列的起始位置，然后，再从剩余未排序元素中继续寻找最小（大）元素，然后放到已排序序列的末尾。以此类推，直到所有元素均排序完毕。
* */
function selectionSort(arr){
    var len = arr.length;
    var minIndex,temp;
    for(var i=0;i<len-1;i++){
        minIndex = i;
        for(var j = i + 1;j<len;j++){
            if(arr[j]<arr[minIndex]){
                minIndex = j;
            };
        };
        temp = arr[i];
        arr[i]=arr[minIndex];
        arr[minIndex] = temp;
    }
    return arr;
}
console.log(selectionSort(arr));

/*
* 5.计数排序
* 计数排序的核心在于将输入的数据值转化为键存储在额外开辟的数组空间中。 作为一种线性时间复杂度的排序，计数排序要求输入的数据必须是有确定范围的整数。
* */

var arr2= [1,9,8,2,5,7,6,9,10]
function countingSort(arr){
    var len = arr.length,
    B = [],
    C = [],
    min = max = arr[0];
    for(var i = 0;i<len;i++){
        min = min <=arr[i] ? min :arr[i];
        max = max >=arr[i] ? max :arr[i];
        C[arr[i]]= C[arr[i]] ? C[arr[i]] +1 : 1;
        console.log(C);
    };
    for(var j = min;j<max;j++){
        C[j + 1] = (C[j+1]||0) + (C[j] || 0);
    };
    for (var k = len - 1; k >= 0; k--) {
        B[C[arr[k]] - 1] = arr[k];
        C[arr[k]]--;
    }
    return B;
}
console.log(countingSort(arr2));




